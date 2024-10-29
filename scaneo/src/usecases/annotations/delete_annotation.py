from ...repos import AnnotationsDBRepo

def delete_annotation(id):
	repo = AnnotationsDBRepo()
	repo.delete_annotation(id)
	return {"message": "Annotation deleted"}