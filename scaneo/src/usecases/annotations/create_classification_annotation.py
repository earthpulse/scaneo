from ...repos import AnnotationsDBRepo
from ...models import Annotation

from .increment_annotation_counter import increment_annotation_counter

def create_classification_annotation(image_id, label):	
	repo = AnnotationsDBRepo()
	data = repo.get_annotation_by_image_id(image_id, label, type="classification")
	if not data:
		print("no annotation found")
		annotation = Annotation(id=repo.generate_id(), type="classification", value=label, image_id=image_id)
		repo.create_annotation(annotation)
		increment_annotation_counter(image_id)
		return annotation
	print("annotation found")
	annotation = Annotation.from_tuple(data)
	annotation.type = "classification" 
	annotation.value = label 
	repo.update_annotation(annotation)
	return annotation
