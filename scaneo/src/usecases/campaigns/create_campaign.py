from ...models import Campaign
from ...repos import CampaignDBRepo

def create_campaign(name, description):
	repo = CampaignDBRepo()
	id = repo.generate_id()
	campaign = Campaign(id=id, name=name, description=description)
	# TODO: checks and validations
	return campaign