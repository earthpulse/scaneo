from ...models import Annotation, DetectionAnnotation
from ...repos import AnnotationsDBRepo

def retrieve_annotations(image_id):
	repo = AnnotationsDBRepo()
	data = repo.retrieve_annotations(image_id)
	print(data)
	annotations = []
	for row in data:
		if row[1] == "detection":
			annotations.append(DetectionAnnotation.from_tuple(row))
		else:
			annotations.append(Annotation.from_tuple(row))
	return annotations

