from ...repos import AnnotationsDBRepo
from ...models import Annotation

from .increment_annotation_counter import increment_annotation_counter

def create_detection_annotation(image_id, bb, label):	
	repo = AnnotationsDBRepo()
	annotation = Annotation(id=repo.generate_id(), type="detection", value=label, bb=bb, image_id=image_id)
	repo.create_annotation(annotation)
	increment_annotation_counter(image_id)
	return annotation
