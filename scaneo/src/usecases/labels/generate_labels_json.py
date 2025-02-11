from .retrieve_labels import retrieve_labels

def generate_labels_json(campaign_id):
    campaign_labels = retrieve_labels(campaign_id)
    labels = {
        "labels":[]
    }
    for label in campaign_labels:
        labels["labels"].append({
            "name" : label.name,
            "color" : label.color
        })
    return labels