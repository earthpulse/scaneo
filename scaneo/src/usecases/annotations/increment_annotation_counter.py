from ...repos import CampaignsDBRepo, ImagesDBRepo
from ...models import Campaign, Image

def increment_annotation_counter(image_id, value = 1):
	campaign_repo = CampaignsDBRepo()
	image_repo = ImagesDBRepo()
	data = image_repo.retrieve_image(image_id)
	if not data:
			raise Exception("Image not found")
	image = Image.from_tuple(data)
	data = campaign_repo.retrieve_one_campaign(image.campaign_id)
	if not data:
		raise Exception("Campaign not found")
	campaign = Campaign.from_tuple(data)
	campaign.annotation_count += value
	campaign_repo.update_campaign(campaign)
	return campaign