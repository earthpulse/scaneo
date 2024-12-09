from glob import glob
import os
import rasterio
import json

from ...models import Campaign, Image
from ...repos import CampaignsDBRepo, ImagesDBRepo
from ...errors.campaigns import CannotImportCampaign
from ...usecases.annotations import create_classification_annotation, create_detection_annotation, create_segmentation_annotation
from ...usecases.labels import create_label
def get_bbox(image):
	src = rasterio.open(image)
	bounds = src.bounds
	crs = src.crs
	if crs != "EPSG:4326":
		bounds = rasterio.warp.transform_bounds(crs, "EPSG:4326", *bounds)
	return json.dumps(bounds)

def add_annotations_to_image(image_id, annotations):
     for annotation in annotations["features"]:
        task = annotation["properties"]["tasks"][0]
        labels = annotation["properties"]["labels"][0]
        if task == "segmentation":
            layer_data = {"type": "Feature","properties": {},"geometry": annotation["geometry"]}
            create_segmentation_annotation(image_id,layer_data,labels)
        elif task == "detection":
            create_detection_annotation(image_id, annotation["properties"]["bbox"], labels)
        elif task == "classification":
            create_classification_annotation(image_id, labels)

def add_labels_to_campaign(campaign_id, labels):
    for label in labels["labels"]:
        create_label(label["name"], label["color"], campaign_id)

async def create_imported_campaign(name, description, path, progress_callback=None):	
    repo = CampaignsDBRepo()
    id = repo.generate_id()
    campaign = Campaign(id=id, name=name, description=description)
    repo.create_campaign(campaign)
    
    # Retrieve images in path recursively
    images = glob(os.path.join(path, '**', '*.tif'), recursive=True)
    geojsons = glob(os.path.join(path, '**', '*.geojson'), recursive=True)
    labels = glob(os.path.join(path, 'spai.json'))
    
    images_repo = ImagesDBRepo()
    bbs = []
    
    # Generate bounding boxes
    if images:
        for i, image in enumerate(images):
            if progress_callback is not None:
                await progress_callback((i + 1) / len(images), f"Processing {image}")
            bbs.append(get_bbox(image))
    else:
        raise ValueError("No images found in the provided path.")
    
    images_repo.create_images(images, id, bbs)

    if labels:
        with open(os.path.join(path, 'spai.json'), 'r') as f:
            add_labels_to_campaign(id, json.loads(f.read()))
        for geojson in geojsons:
            tif_path = f'{os.path.splitext(geojson)[0].replace("_labels", "")}.tif'
            if os.path.exists(tif_path):
                annotating_image = Image.from_tuple(images_repo.retrieve_image_by_path(tif_path, id))
                with open(geojson, 'r') as f:
                    add_annotations_to_image(annotating_image.id, json.loads(f.read()))
    else:
        raise CannotImportCampaign()
    return campaign