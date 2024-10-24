from ...repos import ModelsDBRepo

def delete_model(id):
	repo = ModelsDBRepo()
	repo.delete_model(id)
	return {"message": "Model deleted"}
