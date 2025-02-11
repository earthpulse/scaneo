from ...repos import LabelsDBRepo, LabelMappingsDBRepo

def delete_label(id):
	repo = LabelsDBRepo()
	repo.delete_label(id)
	repo_label_mappings = LabelMappingsDBRepo()
	repo_label_mappings.delete_label_mapping_label(id)
	return {"message": "label deleted"}
