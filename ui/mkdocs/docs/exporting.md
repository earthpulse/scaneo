You can export the annotations of a campaign at any point in the export section.

![export](/img/export.png)

Once you click on the `Export campaign` button, all annotations will be exported. A GeoJSON file will be created in the same directory as the campaign, one file per image. 

The GeoJSON files will contain all the annotations for the image, including the classification, detection and segmentation annotations with the following format:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-71.1872434616089, 42.25596717322463],
            [-71.1872434616089, 42.25739652399595],
            [-71.18968963623048, 42.25739652399595],
            [-71.18968963623048, 42.25596717322463],
            [-71.1872434616089, 42.25596717322463]
          ]
        ]
      },
      "properties": {
        "label": "vegetation",
        "bbox": [
          [42.25596717322463, -71.1872434616089],
          [42.25739652399595, -71.18968963623048]
        ],
        "task": "detection"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      },
      "properties": {
        "label": "water",
        "task": "classification"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      },
      "properties": {
        "label": "vegetation",
        "task": "classification"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [-71.20110655892137, 42.26174789634134],
              [-71.2011055044489, 42.26173201593024],
              [-71.20110655827212, 42.26171613553465],
              "...",
              [-71.20108179677248, 42.261933991422325],
              [-71.20110035441067, 42.261841394030434],
              [-71.20110655892137, 42.26174789634134]
            ]
          ]
        ]
      },
      "properties": {
        "label": "roads",
        "task": "segmentation"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-71.19857311248781, 42.26432047576737],
            [-71.19857311248781, 42.26578139596906],
            [-71.20153427124025, 42.26578139596906],
            [-71.20153427124025, 42.26432047576737],
            [-71.19857311248781, 42.26432047576737]
          ]
        ]
      },
      "properties": {
        "label": "roads",
        "bbox": [
          [42.26432047576737, -71.19857311248781],
          [42.26578139596906, -71.20153427124025]
        ],
        "task": "detection"
      }
    }
  ]
  ...
}
```

Classification annotations are stored as empty polygons with the label name as the property. Detection annotations are stored as polygons with the label name as the property and the bounding box as the geometry. Segmentation annotations are stored as polygons with the label and bbox in the properties. Segmentation annotations are stored as multipolygons with the label in the properties. All annotations, nevertheless, have a `task` property with the type of annotation (classification, detection or segmentation).

Additionally, a `spai.json` file will be created containing the list of labels and associated colors.

```json
{
  "labels": [
    {
      "name": "vegetation",
      "color": "#00ff7b"
    },
    {
      "name": "water", 
      "color": "#0048f0"
    },
    {
      "name": "roads",
      "color": "#fd0d0d"
    }
  ]
}
```

## Importing existing annotations

It is actually possible to create a campaign from existing annotations. For this to work, you will have to fulfill the following requirements:

- The folder contains a `spai.json` file with the list of labels and associated colors in the expected format.
- The folder contains a set of GeoJSON files with the same name as the images (except for the `.geojson` extension) with valid scaneo annotations (expected format explained above).

If you create a campaign with this method, the labels will be created automatically from the `spai.json` file and all annotations will be imported.