import rasterio as rio
import numpy as np
import requests
from io import BytesIO
from rasterio import features
from ...repos import ModelsDBRepo, ImagesDBRepo, CampaignsDBRepo, EOTDLRepo, LabelMappingsDBRepo, LabelsDBRepo
from ...models import Image, Model, Campaign, LabelMapping, Label
from . import processing
from ..annotations import create_segmentation_annotation, retrieve_annotations, create_classification_annotation
from rasterio import features
import numpy as np
from pydantic import BaseModel
from typing import List, Any
import json

class SAMBody(BaseModel):
    image: Any
    points: Any
    label: Any
    crs: Any
    transform: Any


def sigmoid(x):
	return 1 / (1 + np.exp(-x))

def parse_processing_step(step):
	if isinstance(step, str):
		name = step.split("(")[0]
		# params = step.split("(")[1].split(")")[0].split(", ")
		# kwargs = {param.split("=")[0]: param.split("=")[1] for param in params}
		# return getattr(processing, name)(**kwargs)
		return getattr(processing, name)()
	raise ValueError(f"Invalid processing step: {step}")

def inference_model(model_id: str, image: str, points: list = None):
	# retrieve model
	models_repo = ModelsDBRepo()
	model = models_repo.retrieve_model(model_id)
	model = Model.from_tuple(model)
	# retrieve image
	images_repo = ImagesDBRepo()
	image = images_repo.retrieve_image(image)
	image = Image.from_tuple(image)
	# retrieve campaign
	campaign_repo = CampaignsDBRepo()
	campaign = campaign_repo.retrieve_campaign(image.campaign_id)
	campaign = Campaign.from_tuple(campaign)
	# retrieve label mappings
	label_mappings_repo = LabelMappingsDBRepo()
	label_mappings = label_mappings_repo.retrieve_label_mapping_model(campaign.id, model.id)
	label_mappings = [LabelMapping.from_tuple(d) for d in label_mappings]
	# generate image path 
	if campaign.eotdlDatasetId:
		eotdl_repo = EOTDLRepo()
		image_path = eotdl_repo.get_url(campaign.eotdlDatasetId, image.path)
	else:
		image_path = campaign.path + '/' + image.path
	# read image 
	ds = rio.open(image_path)
	transform = ds.transform
	crs = ds.crs
	x = ds.read()
	# apply preprocessing steps
	for step in model.preprocessing:
		x = parse_processing_step(step)(x)
	# save image to memory buffer
	img_buffer = BytesIO()
	# Create memory tif with same metadata as input
	with rio.open(img_buffer, 'w', driver='GTiff',
				height=x.shape[1], width=x.shape[2],
				count=x.shape[0], dtype=x.dtype,
				crs=crs, transform=transform) as dst:
		for i in range(x.shape[0]):
			dst.write(x[i], i+1)
	img_buffer.seek(0)
	# send request with memory buffer
	# res = requests.post(model.url, files={'image': ('image.tif', img_buffer, 'image/tiff')})
	# generate annotations
	annotations = []
	if model.task == "segmentation":
		res = requests.post(model.url, files={'image': (img_buffer)})
		if res.status_code != 200:
			raise Exception(f"Error in inference: {res.status_code} {res.text}")
		# decode the image from the response content
		with rio.open(BytesIO(res.content)) as src:
			# read all bands
			y = src.read()
		# we expect alway only one band with class codified in pixel: 0, 1, 2, ...
		if y.shape[0] > 1:
			raise ValueError(f"Expected only one band with class codified in pixel: 0, 1, 2, ... but got {y.shape[0]} bands")
		# output indexes
		output_indexes = [l.output_index for l in label_mappings]
		# if max(output_indexes) > y.shape[0]:
		# 	raise ValueError(f"Found output index in label mapping that is larger than the number of bands!")
		# apply postprocessing steps
		for step in model.postprocessing:
			y = parse_processing_step(step)(y)
		print(y.shape, y.max(), y.min(), np.unique(y))
		for lm in label_mappings:
			_y = np.zeros_like(y)
			_y[y == lm.output_index] = y[y == lm.output_index]
			
			# Check if this label appears in the segmentation mask
			if lm.output_index not in np.unique(y):
				print(f"Label with output_index {lm.output_index} not found in segmentation mask, skipping...")
				continue
			label_repo = LabelsDBRepo()
			label = label_repo.retrieve_label(lm.labelId)
			label = Label.from_tuple(label)
			# Convert binary mask to vector features
			shapes = features.shapes(
				_y.astype(np.uint8),
				transform=transform
			)
			# Convert shapes to GeoJSON features
			# TODO: make compatible with segmentation annotation format (MultiPolygon)
			geojson = {
				"type": "Feature",
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						shape["coordinates"] for shape, value  in shapes if value ==  lm.output_index
					]
				},  # Extraer la geometría de cada Feature
				"properties": {
					"label": label.name,
					"task": "segmentation"
				}
						# Iterar sobre cada Feature en el FeatureCollection
			}

			if crs:
				geojson["crs"] = {
					"type": "name",  # Tipo correcto
					"properties": {"name": crs.to_string()}
				}
			
			# Convert geojson to EPSG:4326 if it's not already in that CRS
			if crs and crs.to_string() != "EPSG:4326":
				from pyproj import Transformer
				transformer = Transformer.from_crs(crs, "EPSG:4326", always_xy=True)
				
				# Transform coordinates in the MultiPolygon
				transformed_coordinates = []
				for polygon in geojson["geometry"]["coordinates"]:
					transformed_polygon = []
					for ring in polygon:
						transformed_ring = []
						for coord in ring:
							lon, lat = transformer.transform(coord[0], coord[1])
							transformed_ring.append([lon, lat])
						transformed_polygon.append(transformed_ring)
					transformed_coordinates.append(transformed_polygon)
				
				geojson["geometry"]["coordinates"] = transformed_coordinates
				geojson["crs"] = {
					"type": "name",
					"properties": {"name": "EPSG:4326"}
				}
			
			# save annotation 
			ann = create_segmentation_annotation(image.id, geojson, label.name) # se guardan los names en annotations o los ids?
			annotations.append(ann)
	elif model.task == "classification":
		res = requests.post(model.url, files={'image': (img_buffer)})
		if res.status_code != 200:
			raise Exception(f"Error in inference: {res.status_code} {res.text}")
		# get model outputs
		probas = res.json()
		# output indexes
		output_indexes = [l.output_index for l in label_mappings]
		if max(output_indexes) > len(probas):
			raise ValueError(f"Found output index in label mapping that is larger than the number of bands!")
		# apply postprocessing steps
		for step in model.postprocessing:
			y = parse_processing_step(step)(y)
		# get largest probability
		label_id = np.argmax(probas)
		label = [l for l in label_mappings if l.output_index == label_id][0]
		label_repo = LabelsDBRepo()
		label = label_repo.retrieve_label(label.labelId)
		label = Label.from_tuple(label)
		ann = create_classification_annotation(image.id, label.name) # se guardan los names en annotations o los ids?
		annotations.append(ann)
	elif model.task == "SAM":
		for annotation in retrieve_annotations(image.id):
			if annotation.type == "points":
				points = annotation.points
		if points != None:
			for lm in label_mappings:
				with rio.open(image_path) as src:
					red = src.read(4)
					green = src.read(3)
					blue = src.read(2)
					rgb = np.stack([red, green, blue], axis=-1)
					transform = src.transform
					crs = src.crs
					transformer_geo_to_crs = Transformer.from_crs("EPSG:4326", crs, always_xy=True)
					inv_transform = ~transform
					points_pixel = []
					for point in points:
						lat, lon = point
						x_proj, y_proj = transformer_geo_to_crs.transform(lon, lat)
						col, row = inv_transform * (x_proj, y_proj)
						points_pixel.append([col, row])
				label_repo = LabelsDBRepo()
				label = label_repo.retrieve_label(lm.labelId)
				label = Label.from_tuple(label)
				from PIL import Image as PILImage
				from rasterio.transform import Affine
    			# Read RGB bands and convert to uint8
				with rio.open(image_path) as src:
					# Read bands and squeeze singleton dimensions
					red = src.read(4).squeeze().astype(np.uint16)  # Keep original precision
					green = src.read(3).squeeze().astype(np.uint16)
					blue = src.read(2).squeeze().astype(np.uint16)

					# Normalize to 0-255 range if needed (for 16-bit data)
					if red.max() > 255:
						red = (red / 257).astype(np.uint8)
						green = (green / 257).astype(np.uint8)
						blue = (blue / 257).astype(np.uint8)
					else:
						red = red.astype(np.uint8)
						green = green.astype(np.uint8)
						blue = blue.astype(np.uint8)

					# Stack bands and ensure shape is (height, width, 3)
					rgb = np.stack([red, green, blue], axis=-1)

				# Convert to PIL Image
				rgb_pil = PILImage.fromarray(rgb, mode='RGB')
				
				# Save to PNG buffer
				png_buffer = BytesIO()
				rgb_pil.save(png_buffer, format='PNG')
				png_buffer.seek(0)


				# Prepare data and files for the request
				data = {
					"points": json.dumps(points_pixel),
					"label": label.name,
					"crs": str(crs),
					"transform": json.dumps(transform.to_gdal()),  # Convert Affine to GDAL tuple
				}
				files = {'image': ('image.png', png_buffer, 'image/png')}

				# Send POST request
				response = requests.post(model.url, files=files, data=data)

				if response.status_code != 200:
					raise Exception(f"Error in SAM inference: {response.text}")

				geojson = response.json()
				ann = create_segmentation_annotation(image.id, geojson, label.name)
				annotations.append(ann)
		else:
			raise ValueError("You need to set points")
		return annotations
	else:
		raise ValueError(f"Not implemented for task {model.task}")
	return annotations
	