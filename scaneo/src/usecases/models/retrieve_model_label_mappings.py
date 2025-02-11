from ...repos import LabelMappingsDBRepo
from ...models import LabelMapping

def retrieve_model_label_mappings(model_id):
	label_mappings_repo = LabelMappingsDBRepo()
	data = label_mappings_repo.retrieve_label_mappings_model(model_id)
	label_mappings = [LabelMapping.from_tuple(row) for row in data]
	return label_mappings
