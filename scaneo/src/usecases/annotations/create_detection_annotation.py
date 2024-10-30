from ...repos import AnnotationsDBRepo
from ...models import Annotation

def create_detection_annotation(image_id, bb, label):	
	repo = AnnotationsDBRepo()
	annotation = Annotation(id=repo.generate_id(), type="detection", value=label, bb=bb, image_id=image_id)
	repo.create_annotation(annotation)
	return annotation
