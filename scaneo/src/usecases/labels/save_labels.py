from .generate_labels_json import generate_labels_json
from ..images import retrieve_images
import os
import json

def save_labels(campaign_id):
    imgs = retrieve_images(campaign_id)
    path = os.path.commonpath([image.path for image in imgs])
    labels_json = generate_labels_json(campaign_id)
    with open(os.path.join(path.split(os.sep)[0], "spai.json"), "w") as f:
        f.write(json.dumps(labels_json))