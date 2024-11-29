import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawBrush() {
  let drawnItems = $state(null);
  let brushControl = $state(null);

  const LabelHasSegmentation = () => {
    return annotations.data.find((annotation) => {
      return (
        annotation.value == labels.current && annotation.type == "segmentation"
      );
    });
  };

  const onMouseDown = () => {
    if (LabelHasSegmentation()) {
      const currentAnnotation = LabelHasSegmentation();
      brushControl.setData(currentAnnotation.layer_data);
      // console.log(brushControl.layerOptions, brushControl)
      brushControl.options.layerOptions.color = labels.data.filter(
        (label) => currentAnnotation.value == label.name
      )[0].color;
      drawnItems.eachLayer((layer) => {
        if (layer.annotationId === currentAnnotation.id) {
          drawnItems.removeLayer(layer);
        }
      });
    }
  };

  const drawCallback = async () => {
    const layerData = brushControl?.getData();

    if (!layerData) {
      return;
    }

    try {
      if (LabelHasSegmentation()) {
        const currentAnnotation = LabelHasSegmentation();
        deleteCallback(currentAnnotation.id);
      }
      const data = await annotations.createSegmentation(
        layerData,
        labels.current,
        images.current.id
      );

      const layer = L.geoJSON(layerData, {
        style: {
          color: labels.data.filter((label) => data.value == label.name)[0]
            .color,
        },
      });
      layer.annotationId = data.id;
      drawnItems.addLayer(layer);

      brushControl.eraseAll();
    } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };

  const deleteCallback = (annotationId) => {
    drawnItems.eachLayer((layer) => {
      if (layer.annotationId === annotationId) {
        drawnItems.removeLayer(layer);
        annotations.delete(annotationId);
      }
    });
    annotations.delete(annotationId);
  };

  const initItems = (map) => {
    if (!drawnItems) drawnItems = new L.FeatureGroup();
    else drawnItems.clearLayers();
    map.addLayer(drawnItems);
  };

  const initControls = (map) => {
    if (brushControl) {
      brushControl.stop();
      map.removeControl(brushControl);
    }

    brushControl = L.control.paintPolygon({
      layerOptions: {
        color: labels.data.filter((label) => labels.current == label.name)[0]
          .color,
      },
    });
    map.addControl(brushControl);

    map.on("mousedown", onMouseDown);
    map.on("mouseup", drawCallback);
  };

  const addLayer = (annotation) => {
    const layer = L.geoJSON(annotation.layer_data, {
      style: {
        color: labels.data.filter((label) => annotation.value == label.name)[0]
          .color,
      },
    });
    layer.annotationId = annotation.id;
    drawnItems.addLayer(layer);
  };

  return {
    initItems,
    initControls,
    addLayer,
    remove: (map) => {
      if (brushControl) {
        brushControl.stop();
        brushControl.eraseAll();
        map.removeControl(brushControl);
        map.off("mousedown", onMouseDown);
        map.off("mouseup", drawCallback);
      }
      if (drawnItems) map?.removeLayer(drawnItems);

      drawnItems = null;
      brushControl = null;
    },
    removeLayer: deleteCallback,
  };
}

export default createDrawBrush();
