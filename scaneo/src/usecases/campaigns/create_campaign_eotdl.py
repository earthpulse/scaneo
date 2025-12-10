import asyncio
import logging

from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo, EOTDLRepo
from .create_campaign import get_bbox
from ...usecases.labels import create_label

logger = logging.getLogger(__name__)

async def create_campaign_eotdl(name, description, eotdlDatasetName, labels, labelMappings, progress_callback=None):	
	# retreive eotdlDatasetId from eotdlDatasetName
	eotdl_repo = EOTDLRepo()
	eotdl_dataset = eotdl_repo.get_dataset(eotdlDatasetName)
	logger.info("EOTDL dataset retrieved", eotdl_dataset['name'])
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description, eotdlDatasetId=eotdl_dataset['id'])
	# retrieve images from eotdl
	images, error = eotdl_repo.get_files(eotdl_dataset['name'], r"^.*\.tif{1,2}f?$") 
	logger.info("EOTDL images retrieved", len(images))
	if not images or len(images) == 0:
		raise Exception("No '.tif' images found in EOTDL dataset.")
	# generate bounding boxes
	logger.info("Generating bounding boxes")
	if progress_callback is not None:
		# Process in batches for parallel execution with progress updates
		batch_size = 10  # Process 10 images at a time
		bbs = []
		completed = 0
		for i in range(0, len(images), batch_size):
			batch = images[i:i+batch_size]
			# Get URLs for this batch
			urls = [eotdl_repo.get_url(eotdl_dataset['id'], img) for img in batch]
			# Process batch in parallel using threads
			batch_results = await asyncio.gather(
				*[asyncio.to_thread(get_bbox, url) for url in urls]
			)
			bbs.extend(batch_results)
			# Update progress
			completed += len(batch)
			await progress_callback(
				completed / len(images), 
				f"Processing {completed}/{len(images)} images"
			)
			await asyncio.sleep(0)  # Yield to event loop
	else:
		bbs = [get_bbox(eotdl_repo.get_url(eotdl_dataset['id'], image)) for image in images]
	# store images and bounding boxes
	images_repo = ImagesDBRepo()
	images_repo.create_images(images, id, bbs)
	campaign.image_count = len(images)
	# create labels
	if labels:	
		for label in labels:
			create_label(label['name'], label['color'], campaign.id)
	repo.create_campaign(campaign)
	return campaign