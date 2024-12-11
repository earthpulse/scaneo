from glob import glob
import os
import rasterio
import json

from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo
from ...usecases.labels import create_label
from ...usecases.models import create_label_mapping

def get_bbox(image):
	src = rasterio.open(image)
	bounds = src.bounds
	crs = src.crs
	if crs != "EPSG:4326":
		bounds = rasterio.warp.transform_bounds(crs, "EPSG:4326", *bounds)
	return bounds

async def create_campaign(name, description, path, labels, labelMappings, progress_callback=None):	
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description, path=path)
	repo.create_campaign(campaign)
	# create labels
	if labels:
		for label in labels:
			create_label(label['name'], label['color'], campaign.id)
	# create label mappings
	if labelMappings:
		for modelId, mapping in labelMappings.items():
			for labelName, index in mapping.items():
				create_label_mapping(campaign.id, modelId, labelName, index)
	# retrieve images in path recursively
	images = glob(os.path.join(path, '**/*.tif'), recursive=True)
	images_repo = ImagesDBRepo()
	# generate bounding boxes
	if progress_callback is not None:
		bbs = []
		for i, image in enumerate(images):
			await progress_callback((i+1)/len(images), f"Processing {image}")
			bbs.append(get_bbox(image))
	else:
		bbs = [get_bbox(image) for image in images]
	images_repo.create_images(images, id, bbs)
	campaign.image_count = len(images)
	repo.update_campaign(campaign)
	return campaign