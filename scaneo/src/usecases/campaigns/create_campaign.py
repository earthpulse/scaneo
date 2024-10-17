from glob import glob
import os

from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo

def create_campaign(name, description, path):	
	repo = CampaignsDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description)
	repo.create_campaign(campaign)
	# retrieve images in path recursively
	images = glob(os.path.join(path, '**/*.tif'), recursive=True)
	print(path, "images", images)
	images_repo = ImagesDBRepo()
	images_repo.create_images(images, id)
	return campaign