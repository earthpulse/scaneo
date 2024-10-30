from ...models import Annotation
from ...repos import AnnotationsDBRepo

def retrieve_annotations(image_id):
	repo = AnnotationsDBRepo()
	data = repo.retrieve_annotations(image_id)
	return [Annotation.from_tuple(row) for row in data]

