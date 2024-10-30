from ...repos import AnnotationsDBRepo
from ...models import DetectionAnnotation, Annotation

def update_detection_annotation(annotationId, bb):	
	repo = AnnotationsDBRepo()
	data = repo.retrieve_one_annotation(annotationId)
	if not data:
		raise Exception("Annotation not found")
	annotation = DetectionAnnotation.from_tuple(data) if data[1] == "detection" else Annotation.from_tuple(data)
	annotation.bb = bb
	repo.update_annotation(annotation)
	return annotation
