from ...models import Campaign
from ...repos import CampaignDBRepo

def retrieve_campaigns():
	repo = CampaignDBRepo()
	data = repo.retrieve_campaigns()
	campaigns = [Campaign(**d) for d in data]
	# TODO: checks and validations
	return campaigns