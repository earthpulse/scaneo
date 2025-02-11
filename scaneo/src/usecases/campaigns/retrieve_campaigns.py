from ...models import Campaign
from ...repos import CampaignsDBRepo

def retrieve_campaigns():
    repo = CampaignsDBRepo()
    data = repo.retrieve_campaigns()
    campaigns = [Campaign.from_tuple(d) for d in data]
    return campaigns