from ...repos import LabelMappingsDBRepo, LabelsDBRepo
from ...models import LabelMapping, Label
from ...usecases.models import create_label_mapping

def update_label_mappings(campaign_id, labelMappings):
	# delete label mappings that are not in the new labelMappings
	repo = LabelMappingsDBRepo()
	current_label_mappings = repo.retrieve_label_mappings(campaign_id)
	current_label_mappings = [LabelMapping.from_tuple(data) for data in current_label_mappings]
	for label_mapping in current_label_mappings:
		if label_mapping.modelId not in labelMappings:
			repo.delete_label_mapping(label_mapping.id)
	# create new label mappings or update existing ones
	label_mappings = []
	for modelId, mapping in labelMappings.items():
		for labelName, index in mapping.items():
			if index is not None:
				data = create_label_mapping(campaign_id, modelId, labelName, index)
				label_mappings.append(data)
			else:
				# delete if existing and not in the new labelMappings
				labels_repo = LabelsDBRepo()
				data = labels_repo.get_label_by_name(labelName, campaign_id)
				label = Label.from_tuple(data)
				repo.delete_label_mapping_label(campaign_id, modelId, label.id)
	return label_mappings
