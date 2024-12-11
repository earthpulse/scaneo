def generate_segmentation_geojson(layer_data, label):
    return {"type": "Feature","geometry": layer_data["geometry"],"properties": {"labels": [label],"tasks": ["segmentation"]}}