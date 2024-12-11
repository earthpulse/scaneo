def generate_detection_geojson(bbox, label):
                min_lat, min_lng = bbox[0]
                max_lat, max_lng = bbox[1]
                
                polygon_coords = [
                    [min_lng, min_lat], [min_lng, max_lat],
                    [max_lng, max_lat], [max_lng, min_lat], 
                    [min_lng, min_lat]
                ]
                return {"type": "Feature","geometry": {"type": "Polygon","coordinates": [polygon_coords]},"properties": {"labels": [label], "bbox": bbox, "tasks": ["detection"]}}