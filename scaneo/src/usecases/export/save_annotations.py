from ...models import Annotation
from ...repos import AnnotationsDBRepo
import json
from .get_campaign_annotations import get_campaign_annotations
from .generate_image_geojson import generate_geojson

def save_annotations(campaign_id):
    repo = AnnotationsDBRepo()
    annotations = get_campaign_annotations(campaign_id)
    images_geojson = generate_geojson(annotations)
    for image in images_geojson:
        path = image[0].replace(".tif","_labels.geojson")
        with open(path, "w") as f:
            f.write(json.dumps(image[1]))
    return True
