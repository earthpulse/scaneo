import os
import json
from src.storage import Storage
import shutil
import numpy as np

try:
    from pystac import Catalog, MediaType, Collection
except ImportError:
    raise Exception(
        "PySTAC is not installed. Please install PySTAC with `pip install pystac`."
    )

geotiff_type = "image/tiff; application=geotiff"
allowed_media_types = [media_type.value for media_type in MediaType]
label_extension = "https://stac-extensions.github.io/label/v1.0.1/schema.json"
scaneo_asset_key = "labels"
backup_asset_key = "labels_backup"
scaneo_properties_key = "labels"
scaneo_colors_key = "scaneo:colors"
scaneo_role = "scaneo:labels"
scaneo_roles = ["labels", scaneo_role]
image_mode = os.getenv("IMAGE")
asset_name_appendix = "_labels"
labels_key = "label:classes"
supported_image_extensions = [".tif", ".tiff"]


def save_json(file_path, json_file):
    with open(file_path, "w") as f:
        json.dump(json_file, f)


def get_absolute_path(dir, path):
    is_relative = path.startswith(".")
    if is_relative:
        return os.path.normpath(os.path.join(dir, path))
    else:
        return path


class Stac:
    def __init__(self, storage):
        self.catalog = Catalog.from_dict(storage.get_stac_catalog())

    def get_catalog(self):
        return self.catalog

    def collections(self):
        return list(self.catalog.get_children())

    def get_items_paths(self, collection):
        collection_path = collection.get_self_href()
        folder_path = os.path.dirname(collection_path)
        with open(collection_path, "r") as collection_item:
            collection_json = json.load(collection_item)
        item_paths = [
            link["href"] for link in collection_json["links"] if link["rel"] == "item"
        ]
        absolute_paths = [get_absolute_path(folder_path, path) for path in item_paths]
        return absolute_paths

    def find_label_collection(self):
        return next(
            filter(
                lambda collection: label_extension in collection.stac_extensions,
                self.collections(),
            )
        )

    def create_label_collection(self):
        labels_dir = self.catalog.self_href.replace("catalog.json", "labels")
        print("INFO: no label collection found, creating one in", labels_dir)
        if not os.path.exists(labels_dir):
            os.makedirs(labels_dir)
        source_collection_path = self.source_collection().self_href
        shutil.copy(source_collection_path, labels_dir)
        label_collection_path = labels_dir + "/collection.json"
        with open(label_collection_path, "r") as labels_collection:
            collection_json = json.load(labels_collection)
            collection_json["id"] = "labels"
            collection_json["description"] = "Labels"
            collection_json["links"] = []
            collection_json["stac_extensions"] = [label_extension]
            collection_json["summaries"] = {
                scaneo_colors_key: [],
                "label:classes": [{"classes": [], "name": "labels"}],
                "label:type": image_mode,
            }
            save_json(label_collection_path, collection_json)
            collection = Collection.from_dict(collection_json)
            self.catalog.add_child(collection)
            self.catalog.save()
        return collection

    def label_collection(self):
        try:
            return self.find_label_collection()
        except StopIteration:
            return self.create_label_collection()

    def get_labels(self):
        label_collection = self.label_collection().get_self_href()
        print("label_collection", label_collection)
        if label_collection is None:
            return []
        with open(label_collection, "r") as collection:
            collection_json = json.load(collection)
            summaries = collection_json["summaries"]
            labels_dict = summaries[labels_key]
            if len(labels_dict) > 1:
                print("WARNING: more than one label set found, using the first one")
            target_labels = labels_dict[0]
            return target_labels["classes"]

    def get_label_colors(self):
        label_collection = self.label_collection().to_dict()
        summaries = label_collection["summaries"]
        return summaries[scaneo_colors_key] if scaneo_colors_key in summaries else []

    def get_local_labels_and_colors(self):
        storage = Storage()
        labels_file = [f for f in storage.list() if f.endswith("labels.json")]
        if len(labels_file) > 0:
            labels_and_colors_json = storage.read(labels_file[0])["labels"]
            self.save_labels(labels_and_colors_json)
            print(
                "INFO: labels.json found, using it as labels and colors for the STAC catalog"
            )
            return labels_and_colors_json
        return []

    def get_labels_and_colors(self):
        labels = self.get_labels()
        print("labels", labels)
        colors = self.get_label_colors()
        print("colors", colors)
        if len(labels) < 1:
            return self.get_local_labels_and_colors()
        labels_and_colors = [{"name": label} for label in labels]
        for i, label in enumerate(labels_and_colors):
            if label["name"] in colors:
                labels_and_colors[i]["color"] = colors[label["name"]]
        return labels_and_colors

    def find_label_item(self, image_path):
        image_name = os.path.splitext(os.path.basename(image_path))[0]
        label_paths = self.get_items_paths(self.label_collection())
        if not label_paths:
            return None
        for path in label_paths:
            item_name = os.path.splitext(os.path.basename(path))[0]
            if item_name == image_name:
                return path
        return None

    def create_label_item(self, image_path):
        name = os.path.splitext(os.path.basename(image_path))[0]
        collection_path = self.label_collection().get_self_href()
        label_dir = collection_path.replace("collection.json", name)
        if not os.path.exists(label_dir):
            os.makedirs(label_dir)
        source_item = self.find_source_item(image_path)
        shutil.copy(source_item, label_dir)
        label_path = label_dir + f"/{name}.json"
        with open(label_path, "r") as label_item:
            label = json.load(label_item)
            label["stac_extensions"].append(label_extension)
            label["collection"] = "labels"
            label["assets"] = {}
            label["properties"]["label:properties"] = ["labels"]
            label["properties"]["label:description"] = "Item label"
            label["properties"]["label:type"] = "vector"
            label["properties"]["label:classes"] = self.get_labels()
            links = []
            links.append(
                {
                    "rel": "root",
                    "href": os.path.relpath(self.catalog.self_href, label_dir),
                    "type": "application/json",
                }
            )
            links.append(
                {
                    "rel": "collection",
                    "href": os.path.relpath(collection_path, label_dir),
                    "type": "application/json",
                }
            )
            links.append(
                {
                    "rel": "source",
                    "href": os.path.relpath(source_item, label_dir),
                    "type": "application/json",
                }
            )
            label["links"] = links
            save_json(label_path, label)
        self.add_item_to_collection(collection_path, name)
        return label_dir + f"/{name}.json"

    def label_item(self, image_path):
        label_item = self.find_label_item(image_path)
        if label_item is None:
            label_item = self.create_label_item(image_path)
        return label_item

    def add_item_to_collection(self, collection_path, item_name):
        with open(collection_path, "r") as collection_item:
            collection_json = json.load(collection_item)
            collection_json["links"].append(
                {
                    "rel": "item",
                    "href": "./" + item_name + "/" + item_name + ".json",
                    "type": "application/json",
                }
            )
            save_json(collection_path, collection_json)

    def save_labels(self, labels):
        label_names = [label["name"] for label in labels]
        label_collection = self.label_collection().get_self_href()
        with open(label_collection, "r") as item:
            collection_json = json.load(item)
            labels_and_colors = [{label["name"]: label["color"]} for label in labels]
            labels_and_colors_dictionary = {}
            for pair in labels_and_colors:
                for key, value in pair.items():
                    labels_and_colors_dictionary[key] = value
            collection_json["summaries"]["label:classes"][0]["classes"] = label_names
            collection_json["summaries"][
                scaneo_colors_key
            ] = labels_and_colors_dictionary
            save_json(label_collection, collection_json)
        label_items = self.get_items_paths(self.label_collection())
        for label_item in label_items:
            item_json = json.load(open(label_item))
            item_json["properties"]["label:classes"] = label_names
            save_json(label_item, item_json)

    def get_annotations(self, image_path):
        label_item = self.label_item(image_path)
        item_json = json.load(open(label_item))
        assets = item_json["assets"]
        if scaneo_asset_key in assets:
            asset_path = get_absolute_path(
                os.path.dirname(label_item), assets[scaneo_asset_key]["href"]
            )
            asset_json = json.load(open(asset_path))
            asset_tasks = []
            first_feature = asset_json["features"][0]
            if "properties" in first_feature:
                if "tasks" in first_feature["properties"]:
                    asset_tasks = first_feature["properties"]["tasks"]
            tasks = []
            if "label:tasks" in item_json["properties"]:
                tasks = item_json["properties"]["label:tasks"]
            if len(asset_tasks) < 1 and len(tasks) > 0:
                for feature in asset_json["features"]:
                    feature["properties"]["tasks"] = tasks
            properties_key = item_json["properties"]["label:properties"]
            if type(properties_key) == list:
                if len(properties_key) > 1:
                    print(
                        "WARNING: more than one label property found, using the first one"
                    )
                properties_key = properties_key[0]
            for feature in asset_json["features"]:
                if properties_key in feature["properties"]:
                    value = feature["properties"].pop(properties_key)
                    flattened_value = np.array([value]).flatten()
                    feature["properties"][
                        scaneo_properties_key
                    ] = flattened_value.tolist()
            return asset_json
        else:
            geojson = {
                "type": "FeatureCollection",
                "features": [item_json],
            }
            return geojson

    def find_source_item(self, image_path):
        image_name = os.path.splitext(os.path.basename(image_path))[0]
        source_paths = self.get_items_paths(self.source_collection())
        for path in source_paths:
            item_name = os.path.splitext(os.path.basename(path))[0]
            if item_name == image_name:
                return path

    def source_collection(self):
        collections = self.collections()
        return next(
            filter(
                lambda collection: not label_extension in collection.stac_extensions,
                collections,
            )
        )

    def get_images_info(self, source_items_paths):
        image_paths_and_bboxes = []
        for image_item_path in source_items_paths:
            with open(image_item_path, "r") as item:
                json_item = json.load(item)
                image_name = json_item["id"]
                image_info = json_item["assets"][image_name]
                image_path = image_info["href"]
                image_extension = os.path.splitext(image_path)[1]
                if image_extension not in supported_image_extensions:
                    continue
                image_absolute_path = get_absolute_path(os.getenv("DATA"), image_path)
                path_bbox = {"name": image_absolute_path, "bbox": json_item["bbox"]}
                image_paths_and_bboxes.append(path_bbox)
        return image_paths_and_bboxes

    def build_scaneo_asset(self, asset_name):
        asset = {
            "href": "./" + asset_name + ".geojson",
            "title": "Label",
            "type": "application/geo+json",
            "roles": scaneo_roles,
        }
        return asset

    def add_scaneo_asset(self, image_path):
        label_item = self.label_item(image_path)
        with open(label_item, "r") as item:
            item_json = json.load(item)
            asset_name = (
                os.path.splitext(os.path.basename(image_path))[0] + asset_name_appendix
            )
            if scaneo_asset_key not in item_json["assets"]:
                item_json["assets"][scaneo_asset_key] = self.build_scaneo_asset(
                    asset_name
                )
            else:
                if scaneo_role not in item_json["assets"][scaneo_asset_key]["roles"]:
                    item_json["assets"][backup_asset_key] = item_json["assets"][
                        scaneo_asset_key
                    ]
                    asset_href = item_json["assets"][scaneo_asset_key]["href"]
                    existing_asset_name = os.path.splitext(
                        os.path.basename(asset_href)
                    )[0]
                    if existing_asset_name == asset_name:
                        # Rename file to avoid overwriting
                        new_asset_href = asset_href.replace(
                            existing_asset_name, existing_asset_name + "_backup"
                        )
                        item_json["assets"][backup_asset_key]["href"] = new_asset_href
                        dir = os.path.dirname(label_item)
                        os.rename(
                            get_absolute_path(dir, asset_href),
                            get_absolute_path(dir, new_asset_href),
                        )
                    item_json["assets"][scaneo_asset_key] = self.build_scaneo_asset(
                        asset_name
                    )
            save_json(label_item, item_json)

    def save(self, image_path, geojson_string):
        self.add_scaneo_asset(image_path)
        label_item = self.find_label_item(image_path)
        label_item_dir = os.path.dirname(label_item)
        image_name = os.path.splitext(os.path.basename(image_path))[0]
        geojson = json.loads(geojson_string.json())
        storage = Storage()
        storage.save(
            label_item_dir + "/" + image_name + asset_name_appendix + ".geojson",
            json.dumps(geojson),
        )
