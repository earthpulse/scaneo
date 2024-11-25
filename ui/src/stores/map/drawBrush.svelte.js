import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawBrush() {
  let drawnItems = $state(null);
  let brushControl = $state(null);

  const drawCallback = async () => {
    const layerData = brushControl?.getData();
  
    if (!layerData) {
      console.warn("No data to save or invalid layerData structure:", layerData);
      return;
    }
  
    try {
      const data = await annotations.createSegmentation(
        layerData,
        labels.current,
        images.current.id
      );
  
      const layer = L.geoJSON(layerData, {
        style: { color: "#000000"},
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
      layerOptions: { color: "#000000" },
    });
    map.addControl(brushControl);

    map.on("keydown", drawCallback);
  };

  const addLayer = (annotation, map) => {
    const layer = L.geoJSON(annotation.layer_data, {
      style: { color: "#000000"},
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
      }
      if (drawnItems) map?.removeLayer(drawnItems);

      drawnItems = null;
      brushControl = null;
    },
    removeLayer: deleteCallback,
  };
}

export default createDrawBrush();


