Upon saving, GeoJSON of type 'FeatureCollection' is created, named as '_image_name_\_labels.geojson'.
The list of features will be each of the labelling tasks that have been saved.

Each of these features will have the following keys under 'properties'

- 'labels': A list with the labels that apply to the feature.
- 'tasks': A list with the tasks that apply to the feature.

If you're working with spare data, this Geojson will be in the root of your data directory.

If you're working with a STAC catalog, a [label collection](https://github.com/stac-extensions/label) will be created if it doesn't exist already. The Geojson will be stored in a STAC item, under the 'assets' property with the key 'labels'.
