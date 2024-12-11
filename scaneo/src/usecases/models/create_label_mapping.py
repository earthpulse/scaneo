from ...repos import LabelMappingsDBRepo, LabelsDBRepo
from ...models import Label, LabelMapping

def create_label_mapping(campaing_id, model_id, label_name, index):
	labels_repo = LabelsDBRepo()
	data = labels_repo.get_label_by_name(label_name, campaing_id)
	if not data:
		raise ValueError(f"Label '{label_name}' not found in campaign '{campaing_id}'")
	label = Label.from_tuple(data)
	repo = LabelMappingsDBRepo()
	label_mapping = LabelMapping(id=repo.generate_id(), campaignId=campaing_id, modelId=model_id, labelId=label.id, output_index=index)
	if repo.label_mapping_exists(campaing_id, model_id, label.id):
		repo.update_label_mapping(label_mapping)
	else:
		repo.create_label_mapping(label_mapping)
	return label_mapping