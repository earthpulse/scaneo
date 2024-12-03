import rasterio as rio
import numpy as np
import PIL
import requests
from io import BytesIO
from rasterio import features
import os

from ...repos import ModelsDBRepo, ImagesDBRepo, CampaignsDBRepo, EOTDLRepo, LabelMappingsDBRepo, LabelsDBRepo
from ...models import Image, Model, Campaign, LabelMapping, Label
from . import processing
from ..annotations import create_segmentation_annotation

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

def inference_model(model_id: str, image: str):
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
		image_path = image.path
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
	res = requests.post(model.url, files={'image': (img_buffer)})
	# res = requests.post(model.url, files={'image': ('image.tif', img_buffer, 'image/tiff')})
	if res.status_code != 200:
		raise Exception(f"Error in inference: {res.status_code} {res.text}")
	# generate annotations
	annotations = []
	if model.task == "segmentation":
		# decode the image from the response content
		with rio.open(BytesIO(res.content)) as src:
			# y = src.read(1)  # Read the first band
			# read all bands
			y = src.read()
		print("y", y.shape)
		# output indexes
		output_indexes = [l.output_index for l in label_mappings]
		if max(output_indexes) > y.shape[0]:
			raise ValueError(f"Found output index in label mapping that is larger than the number of bands!")
		# apply postprocessing steps
		for step in model.postprocessing:
			y = parse_processing_step(step)(y)
		for ix, band in enumerate(y):
			# get label from label mapping
			label_id = [l for l in label_mappings if l.output_index == ix]
			if len(label_id) == 0:
				continue # no label mapping for this band
			label_id = label_id[0]
			label_repo = LabelsDBRepo()
			label = label_repo.retrieve_label(label_id)
			label = Label.from_tuple(label)
			# Convert binary mask to vector features
			shapes = features.shapes(
				band.astype(np.uint8),
				transform=transform
			)
			# Convert shapes to GeoJSON features
			# TODO: make compatible with segmentation annotation format
			# {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'MultiPolygon', 'coordinates': [[[[2.805799538073053, 42.35803640805155], ..., [2.805799538073053, 42.35803640805155]]]]}}
			geojson = {
				"type": "FeatureCollection",
				"features": [
					{
						"type": "Feature",
						"geometry": geometry,
						"properties": {"value": value}
					}
					for geometry, value in shapes
				]
			}
			# Add CRS information if available
			if crs:
				geojson["crs"] = {
					"type": "name",
					"properties": {"name": crs.to_string()}
				}
			# save annotation 
			# create_segmentation_annotation(image.id, geojson, label.name) # se guardan los names en annotations o los ids?
		return annotations
	else:
		raise ValueError(f"Not implemented for task {model.task}")