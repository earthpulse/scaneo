import rasterio as rio
import numpy as np
import PIL
import requests
from io import BytesIO
from rasterio import features

from ...repos import ModelsDBRepo, ImagesDBRepo
from ...models import Image, Model

def sigmoid(x):
	return 1 / (1 + np.exp(-x))

def inference_model(model_id: str, image: str):
	
	# get image path 
	images_repo = ImagesDBRepo()
	image = images_repo.retrieve_image(image)
	image = Image.from_tuple(image)
	
	# read image 
	ds = rio.open(image.path)
	transform = ds.transform
	crs = ds.crs
	x = ds.read((4,3,2))
	x = np.clip(x / 3000, 0, 1)
	x = (x * 255).astype(np.uint8)
	x = x.transpose(1,2,0) # convert to HWC
	x = PIL.Image.fromarray(x)
	  
	# save image to memory buffer
	img_buffer = BytesIO()
	x.save(img_buffer, format='PNG')
	img_buffer.seek(0)
	
	# inference
	models_repo = ModelsDBRepo()
	model = models_repo.retrieve_model(model_id)
	model = Model.from_tuple(model)

	# send request with memory buffer
	res = requests.post(model.url, files={'image': img_buffer})
	
	# parse response
	image_bytes = BytesIO(res.content)
	img = PIL.Image.open(image_bytes)
	logits = np.array(img) 
	probas = sigmoid(logits)
	mask = probas > 0.5 

	# Convert binary mask to vector features
	shapes = features.shapes(
		mask.astype(np.uint8),
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
