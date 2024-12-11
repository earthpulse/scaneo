from ...repos import AnnotationsDBRepo
from ...models import Annotation

from .increment_annotation_counter import increment_annotation_counter

def delete_annotation(id):
	repo = AnnotationsDBRepo()
	data = repo.retrieve_one_annotation(id)
	if not data:
		raise Exception("Annotation not found")
	annotation = Annotation.from_tuple(data)
	repo.delete_annotation(id)
	increment_annotation_counter(annotation.image_id, -1)
	return {"message": "Annotation deleted"}