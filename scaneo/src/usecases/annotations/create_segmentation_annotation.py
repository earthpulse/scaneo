from ...repos import AnnotationsDBRepo
from ...models import Annotation

from .increment_annotation_counter import increment_annotation_counter

def create_segmentation_annotation(image_id, layer_data, label):	
	repo = AnnotationsDBRepo()
	annotation = Annotation(id=repo.generate_id(), type="segmentation", value=label, image_id=image_id, layer_data=layer_data)
	repo.create_annotation(annotation)
	increment_annotation_counter(image_id)
	return annotation
