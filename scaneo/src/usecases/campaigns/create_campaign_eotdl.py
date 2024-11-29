from glob import glob
import os
import rasterio
import json

from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo, EOTDLRepo
from .create_campaign import get_bbox


async def create_campaign_eotdl(name, description, eotdlDatasetId, progress_callback=None):	
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description, eotdlDatasetId=eotdlDatasetId)
	repo.create_campaign(campaign)
	# retrieve images from eotdl
	eotdl_repo = EOTDLRepo()
	images, error = eotdl_repo.get_files(eotdlDatasetId, "*.tif") 
	if len(images) == 0:
		raise Exception("No '.tif' images found in EOTDL dataset.")
	# generate bounding boxes
	if progress_callback is not None:
		bbs = []
		for i, image in enumerate(images):
			await progress_callback((i+1)/len(images), f"Processing {image}")
			bbs.append(get_bbox(eotdl_repo.get_url(eotdlDatasetId, image)))
	else:
		bbs = [get_bbox(eotdl_repo.get_url(eotdlDatasetId, image)) for image in images]
	# store images and bounding boxes
	images_repo = ImagesDBRepo()
	images_repo.create_images(images, id, bbs)
	return campaign