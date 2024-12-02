import rasterio as rio
import numpy as np
import PIL
import requests
from io import BytesIO
from rasterio import features
import os

from ...repos import ModelsDBRepo, ImagesDBRepo, CampaignsDBRepo, EOTDLRepo
from ...models import Image, Model, Campaign
from . import processing

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
	
	# get image path 
	images_repo = ImagesDBRepo()
	image = images_repo.retrieve_image(image)
	image = Image.from_tuple(image)

	# generate image path 
	campaign_repo = CampaignsDBRepo()
	campaign = campaign_repo.retrieve_campaign(image.campaign_id)
	campaign = Campaign.from_tuple(campaign)
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
	

	if model.task == "segmentation":
		# decode the image from the response content
		with rio.open(BytesIO(res.content)) as src:
			y = src.read(1)  # Read the first band

		# apply postprocessing steps
		for step in model.postprocessing:
			y = parse_processing_step(step)(y)

		# Convert binary mask to vector features
		shapes = features.shapes(
			y.astype(np.uint8),
			transform=transform
		)
		# Convert shapes to GeoJSON features
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
		return geojson
	else:
		raise ValueError(f"Not implemented for task {model.task}")