from ...models import Campaign
from ...repos import CampaignsDBRepo

def retrieve_one_campaign(campaign_id):
    repo = CampaignsDBRepo()
    data = repo.retrieve_one_campaign(campaign_id)
    return Campaign.from_tuple(data)