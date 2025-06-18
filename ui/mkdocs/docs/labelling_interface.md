![Labelling Interface](/img/interface.png)

The labelling interface is composed of the following elements:

- Top bar: contains the annotation options, model selector, export button and other controls.
- Right panel:
    - Image explorer: shows the images in the campaign.
    - Labels, annotations and settings
        - labels: create and delete labels.
        - annotations: delete annotations.
        - settings: image band and brightness controls.
- Left panel: map with the image, annotations and map controls (base layer, zoom level, etc).

## Visualize images

In order to see an image in the map, just click its name on the image explorer.

You can change the bands and brightness of the image by clicking on the settings button.

## Create labels

You can create a new label by clicking on the `+` button on the labels section, providing a name and a color.

![Create Label](/img/labels.png)

## Delete labels

You can delete a label by clicking on the `x` button on the labels section.

> If you delete a label, all the annotations with that label will be deleted.

## Create annotations

To create an annotation, first click an image and a label. With both selected, you can annotate it with the annotation options.

![Create Annotation](/img/annotation.png)

In order, from left to right:

- Classification: when clicked, the label will be assigned to the image as a classification label. You can add any number of classification labels to an image.
- Detection: when clicked, you will be able to draw boxes in the map on top of the image. Every time you draw a box, a new annotation will be created with the selected label. You can use the drawing tool to edit and delete existing boxes.
- Segmentation: when clicked, you will be able to freely draw on top of the image. Every time you draw, a new annotation will be created with the selected label unless an annotation with the same label already exists (in this case, the existing annotation will be updated). You can use the drawing tool to edit and delete existing annotations.

![annotation_options](/img/annotations.png)

## Delete annotations

You can delete an annotation in the annotations panel.

## Export annotations

Once your annotations are ready, you can export them by clicking on the `export` button on the top bar. Learn more in the [Exporting](exporting.md) section.