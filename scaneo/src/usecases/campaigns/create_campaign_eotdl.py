from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo, EOTDLRepo
from .create_campaign import get_bbox
from ...usecases.labels import create_label

async def create_campaign_eotdl(name, description, eotdlDatasetName, labels, labelMappings, progress_callback=None):	
	# retreive eotdlDatasetId from eotdlDatasetName
	eotdl_repo = EOTDLRepo()
	eotdlDatasetId = eotdl_repo.get_dataset(eotdlDatasetName)
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description, eotdlDatasetId=eotdlDatasetId)
	# retrieve images from eotdl
	images, error = eotdl_repo.get_files(eotdlDatasetName, "*.tif") 
	if not images or len(images) == 0:
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
	campaign.image_count = len(images)
	# create labels
	if labels:	
		for label in labels:
			create_label(label['name'], label['color'], campaign.id)
	repo.create_campaign(campaign)
	return campaign