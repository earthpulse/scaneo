import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawItems() {
  let drawnItems = $state(null);
  let drawControl = $state(null);

  const drawCallback = (e) => {
    console.log("drawCallback");
    const { layer } = e;
    // layer.options.color = currentLabelStore.retrieve().color;
    // layer.options.fillOpacity = optionsStore.retrieve().opacity;
    // layer.options.interactive = false;
    const bounds = layer.getBounds();
    annotations.createDetection(
      [
        [bounds._southWest.lat, bounds._northEast.lng],
        [bounds._northEast.lat, bounds._southWest.lng],
      ],
      labels.current,
      images.current.id
    );
  };

  const editCallback = (e) => {
    console.log("editCallback");
  };

  const deleteCallback = (e) => {
    console.log("deleteCallback");
  };

  return {
    init: (map) => {
      drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
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
            showArea: false, // sino peta
          },
          polygon: false,
        },
      });
      map.addControl(drawControl);
      map.on(L.Draw.Event.CREATED, drawCallback);
      map.on(L.Draw.Event.EDITED, editCallback);
      map.on(L.Draw.Event.DELETED, deleteCallback);
    },
    remove: (map) => {
      map.removeLayer(drawnItems);
      map.removeControl(drawControl);
      drawnItems = null;
      drawControl = null;
    },
  };
}

export default createDrawItems();
