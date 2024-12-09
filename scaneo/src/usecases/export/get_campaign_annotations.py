from ...repos import AnnotationsDBRepo
from ...repos import ImagesDBRepo
from ...models import Image
from ...models import Annotation

def get_campaign_annotations(campaign_id):
    annotations_repo = AnnotationsDBRepo()
    images_repo = ImagesDBRepo()
    data = images_repo.retrieve_images(campaign_id)
    images = [Image.from_tuple(d) for d in data]
    annotations = []
    for image in images:
        annotations.append([Annotation.from_tuple(d) for d in annotations_repo.retrieve_annotations(image.id)])
    return annotations

