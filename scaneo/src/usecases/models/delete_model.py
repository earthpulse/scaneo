from ...repos import ModelsDBRepo, LabelMappingsDBRepo

def delete_model(id):
	repo = ModelsDBRepo()
	repo.delete_model(id)
	label_mappings_repo = LabelMappingsDBRepo()
	label_mappings_repo.delete_label_mapping_model(id)
	return {"message": "Model deleted"}
