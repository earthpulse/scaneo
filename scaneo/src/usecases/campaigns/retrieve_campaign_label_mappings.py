from ...repos import LabelMappingsDBRepo
from ...models import LabelMapping

def retrieve_campaign_label_mappings(campaign_id):
	label_mappings_repo = LabelMappingsDBRepo()
	data = label_mappings_repo.retrieve_label_mappings(campaign_id)
	label_mappings = [LabelMapping.from_tuple(row) for row in data]
	return label_mappings
