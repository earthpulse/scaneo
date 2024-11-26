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

def create_campaign(name, description, path):	
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description)
	repo.create_campaign(campaign)
	# retrieve images in path recursively
	images = glob(os.path.join(path, '**/*.tif'), recursive=True)
	images_repo = ImagesDBRepo()
	bbs = [get_bbox(image) for image in images]
	images_repo.create_images(images, id, bbs)
	return campaign