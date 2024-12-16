import os
import json

from ..campaigns.retrieve_one_campaign import retrieve_one_campaign
from .retrieve_labels import retrieve_labels

def export_labels(campaign_id, export_type, export_path):
	campaign = retrieve_one_campaign(campaign_id)
	campaign_labels = retrieve_labels(campaign_id)
	labels = {
		"labels":[]
	}
	for label in campaign_labels:
		labels["labels"].append({
			"name" : label.name,
			"color" : label.color
		})
	if campaign.path:
		with open(os.path.join(campaign.path, "spai.json"), "w") as f:
			f.write(json.dumps(labels))
		return
	if export_type == "folder":
		os.makedirs(export_path, exist_ok=True)
		with open(os.path.join(export_path, "spai.json"), "w") as f:
			f.write(json.dumps(labels))
		return
	raise Exception("Export mode not implemented")