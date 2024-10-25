from ...repos import LabelsDBRepo

def delete_label(id):
	repo = LabelsDBRepo()
	repo.delete_label(id)
	return {"message": "label deleted"}
