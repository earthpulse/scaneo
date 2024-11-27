from glob import glob
import os
import rasterio
import json

from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo

def get_bbox(image):
	src = rasterio.open(image)
	bounds = src.bounds
	crs = src.crs
	if crs != "EPSG:4326":
		bounds = rasterio.warp.transform_bounds(crs, "EPSG:4326", *bounds)
	return json.dumps(bounds)

async def create_campaign(name, description, path, progress_callback=None):	
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description)
	repo.create_campaign(campaign)
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
	return campaign