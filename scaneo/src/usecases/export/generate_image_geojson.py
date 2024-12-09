from ...models import Annotation 
from ...models import Image

from ...repos import ImagesDBRepo
from .generate_detection_geojson import generate_detection_geojson
from .generate_segmentation_geojson import generate_segmentation_geojson
from .generate_clasification_geojson import generate_clasification_geojson

def generate_geojson(annotations_data: list[list[Annotation]]):
    features = []
    images = []
    images_repo = ImagesDBRepo()
    for image_annotations in annotations_data:
        for annotation in image_annotations:
            if annotation.layer_data:
                features.append(generate_segmentation_geojson(annotation.layer_data, annotation.value))
            elif annotation.bb:
                features.append(generate_detection_geojson(annotation.bb, annotation.value))
            else:
                features.append(generate_clasification_geojson(annotation.value))
        feature_collection = {
            "type": "FeatureCollection",
            "features": features
        }
        if image_annotations:
            image = Image.from_tuple(images_repo.retrieve_image(image_annotations[0].image_id))
            images.append((image.path, feature_collection))
        features = []
    return images
