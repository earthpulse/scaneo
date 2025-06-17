import json
import os

from ..images.retrieve_images import retrieve_images
from .retrieve_annotations import retrieve_annotations
from ..campaigns.retrieve_one_campaign import retrieve_one_campaign

async def export_annotations(campaign_id, export_type, export_path, progress_callback=None):
	campaign = retrieve_one_campaign(campaign_id)	
	images = retrieve_images(campaign_id)
	for i, image in enumerate(images):
		if progress_callback is not None:
			await progress_callback((i+1)/len(images), f"Exporting annotations for {image.path}")
		annotations = retrieve_annotations(image.id)
		if annotations:
			feature_collection = {
				"type": "FeatureCollection",
				"features": []
			}
			for annotation in annotations:
				if annotation.type == "classification":
					feature_collection["features"].append({
						"type": "Feature",
						"geometry": {
							# "type": "Point",
							# "coordinates": [
							# 	image.bbox[0], 
							# 	image.bbox[1]
							# ]
							"type": "Polygon",
							"coordinates": []
						},
						"properties": {
							"label": annotation.value,
							"task": "classification"
						}
					})
				elif annotation.type == "detection":
					min_lat, min_lng = annotation.bb[0]
					max_lat, max_lng = annotation.bb[1]
					polygon_coords = [
						[min_lng, min_lat], [min_lng, max_lat],
						[max_lng, max_lat], [max_lng, min_lat], 
						[min_lng, min_lat]
					]
					feature_collection["features"].append({
						"type": "Feature",
						"geometry": {
							"type": "Polygon",
							"coordinates": [polygon_coords]
						},
						"properties": {
							"label": annotation.value,
							"bbox": annotation.bb,
							"task": "detection"
						}
					})
				elif annotation.type == "segmentation":
					feature_collection["features"].append(
						{
							"type": "Feature",
							"geometry": annotation.layer_data["geometry"],
							"properties": {
								"label": annotation.value,
								"task": "segmentation"
							}
						}
					)
			
			if export_type == "eotdl":
				raise Exception("Export type not implemented")
			else:
				dst_path = campaign.path + '/' + '.'.join(image.path.split('.')[:-1]) + '.geojson'
				if export_type == "folder":
					dst_path = os.path.join(export_path, dst_path)
				os.makedirs(os.path.dirname(dst_path), exist_ok=True)
				with open(dst_path, "w") as f:
					json.dump(feature_collection, f)
	return