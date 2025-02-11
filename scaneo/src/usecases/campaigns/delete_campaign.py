from ...models import Campaign
from ...repos import CampaignsDBRepo, ImagesDBRepo, LabelsDBRepo, LabelMappingsDBRepo

def delete_campaign(id):
	repo = CampaignsDBRepo()
	repo.delete_campaign(id)
	image_repo = ImagesDBRepo()
	image_repo.delete_images(id)
	label_repo = LabelsDBRepo()
	label_repo.delete_labels(id)
	label_mappings_repo = LabelMappingsDBRepo()
	label_mappings_repo.delete_label_mappings(id)
	return {"message": "Campaign deleted"}
