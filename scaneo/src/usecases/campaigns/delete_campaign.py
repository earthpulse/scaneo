from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo

def delete_campaign(id):
	repo = CampaignsDBRepo()
	repo.delete_campaign(id)
	image_repo = ImagesDBRepo()
	image_repo.delete_images(id)
	return {"message": "Campaign deleted"}
