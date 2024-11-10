import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawBoxes() {
  let drawnItems = $state(null);
  let drawControl = $state(null);

  const drawCallback = async (e) => {
    console.log("drawCallback");
    const { layer } = e;
    // layer.options.fillOpacity = optionsStore.retrieve().opacity;
    // layer.options.interactive = false;
    const bounds = layer.getBounds();
    const data = await annotations.createDetection(
      [
        [bounds._southWest.lat, bounds._northEast.lng],
        [bounds._northEast.lat, bounds._southWest.lng],
      ],
      labels.current,
      images.current.id
    );
    layer.options.color = labels.data.filter((label) => data.value == label.name)[0].color
    console.log("data", data);
    layer.annotationId = data.id;
    drawnItems.addLayer(layer);
  };

  const editCallback = (e) => {
    console.log("editCallback");
    e.layers.eachLayer((layer) => {
      const bounds = layer.getBounds();
      annotations.updateDetection(layer.annotationId, [
        [bounds._southWest.lat, bounds._northEast.lng],
        [bounds._northEast.lat, bounds._southWest.lng],
      ]);
    });
  };

  const deleteCallback = (e) => {
    console.log("deleteCallback");
    // console.log(e.layers._layers);
    e.layers.eachLayer((layer) => {
      annotations.delete(layer.annotationId);
    });
  };

  const initItems = (map) => {
    if (!drawnItems) drawnItems = new L.FeatureGroup();
    else drawnItems.clearLayers();
    map.addLayer(drawnItems);
  };

  const initControls = (map) => {
    drawControl = new L.Control.Draw({
      position: "topright",
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polyline: false,
        circlemarker: false,
        circle: false,
        marker: false,
        rectangle: {
          repeatMode: true,
          showArea: false,
          showLength: true,
          shapeOptions: {
            weight: 1,
          },
        },
        polygon: false,
      },
    });
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, async (e) => await drawCallback(e));
    map.on(L.Draw.Event.EDITED, editCallback);
    map.on(L.Draw.Event.DELETED, deleteCallback);
  };

  return {
    initItems,
    initControls,
    remove: (map) => {
      if (drawnItems) map?.removeLayer(drawnItems);
      if (drawControl) map?.removeControl(drawControl);
      drawnItems = null;
      drawControl = null;
    },
    addLayer: (annotation) => {
      const bb = annotation.bb;
      const layer = L.rectangle(
        [
          [bb[0][0], bb[0][1]],
          [bb[1][0], bb[1][1]],
        ],
        {
          editing: true,
          // interactive: false,
        }
      );
      layer.options.color = labels.data.filter((label) => annotation.value == label.name)[0].color
      // .on("click", () => {
      //   console.log("rectanle", layer.annotationId);
      // });
      layer.annotationId = annotation.id;
      drawnItems.addLayer(layer);
    },
    removeLayer: (id) => {
      drawnItems.eachLayer((layer) => {
        if (layer.annotationId === id) drawnItems.removeLayer(layer);
      });
    },
  };
}

export default createDrawBoxes();
