def generate_clasification_geojson(label):
                return {"type": "Feature","geometry": {"type": "Polygon","coordinates": []},"properties": {"labels": [label], "tasks": ["classification"]}}