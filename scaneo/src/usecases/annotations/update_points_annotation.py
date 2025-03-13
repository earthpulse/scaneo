from ...repos import AnnotationsDBRepo
from ...models import Annotation

def update_points_annotation(annotationId, points):	
	repo = AnnotationsDBRepo()
	data = repo.retrieve_one_annotation(annotationId)
	if not data:
		raise Exception("Annotation not found")
	annotation = Annotation.from_tuple(data)
	annotation.points = points
	repo.update_annotation(annotation)
	return annotation
