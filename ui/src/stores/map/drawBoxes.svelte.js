import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawBoxes() {
  let drawnItems = $state(null);
  let drawControl = $state(null);

  let drawCreatedHandler;
  let drawEditedHandler;
  let drawDeletedHandler;

  const drawCallback = async (e) => {
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
    layer.options.color = labels.data.filter(
      (label) => data.value == label.name
    )[0].color;
    layer.annotationId = data.id;
    drawnItems.addLayer(layer);
  };

  const editCallback = (e) => {
    e.layers.eachLayer((layer) => {
      const bounds = layer.getBounds();
      annotations.updateDetection(layer.annotationId, [
        [bounds._southWest.lat, bounds._northEast.lng],
        [bounds._northEast.lat, bounds._southWest.lng],
      ]);
    });
  };

  const deleteCallback = (e) => {
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
    if (!drawnItems) initItems(map);

    if (drawCreatedHandler) map.off(L.Draw.Event.CREATED, drawCreatedHandler);
    if (drawEditedHandler) map.off(L.Draw.Event.EDITED, drawEditedHandler);
    if (drawDeletedHandler) map.off(L.Draw.Event.DELETED, drawDeletedHandler);
    if (drawControl) map.removeControl(drawControl);

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

    drawCreatedHandler = async (e) => await drawCallback(e);
    drawEditedHandler = editCallback;
    drawDeletedHandler = deleteCallback;

    map.on(L.Draw.Event.CREATED, drawCreatedHandler);
    map.on(L.Draw.Event.EDITED, drawEditedHandler);
    map.on(L.Draw.Event.DELETED, drawDeletedHandler);
  };

  return {
    initItems,
    initControls,
    remove: (map) => {
      if (drawnItems) map?.removeLayer(drawnItems);
      if (drawControl) map?.removeControl(drawControl);

      if (drawCreatedHandler) map.off(L.Draw.Event.CREATED, drawCreatedHandler);
      if (drawEditedHandler) map.off(L.Draw.Event.EDITED, drawEditedHandler);
      if (drawDeletedHandler) map.off(L.Draw.Event.DELETED, drawDeletedHandler);

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
        }
      );
      layer.options.color = labels.data.filter(
        (label) => annotation.value == label.name
      )[0].color;
      // .on("click", () => {
      //   console.log("rectanle", layer.annotationId);
      // });
      layer.annotationId = annotation.id;
      drawnItems.addLayer(layer);
    },
    removeLayer: (id) => {
      drawnItems?.eachLayer((layer) => {
        if (layer.annotationId === id) drawnItems.removeLayer(layer);
      });
    },
  };
}

export default createDrawBoxes();
