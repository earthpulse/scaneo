import images from "$stores/images.svelte.js";
import settings from "$stores/settings.svelte.js";

function createImageBBs() {
  let bbs = $state(null);
  return {
    initItems: (map) => {
      if (!bbs) bbs = new L.FeatureGroup();
      else bbs.clearLayers();
      map.addLayer(bbs);
    },
    addBbox: (image, map) => {
      let bb = image.bbox;
      bb = L.rectangle(
        [
          [bb[1], bb[0]],
          [bb[3], bb[2]],
        ],
        {
          interactive: true,
          //   color: "#ff0000", // Red color
          weight: 10, // Line thickness
          //   opacity: 0.8, // Line opacity
          //   fillColor: "#ff0000", // Fill color
          //   fillOpacity: 0.2, // Fill opacity
        }
      );
      bb.annotationId = image.path;
      bb.on("click", () => {
        map.fitBounds(bb.getBounds());
        images.current = image;
      });
      bbs.addLayer(bb);
    },
    zoom: (map) => {
      const bounds = bbs.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    },
    toggle: (map) => {
      if (settings.showImageBBs) {
        map.removeLayer(bbs);
        settings.showImageBBs = false;
      } else {
        map.addLayer(bbs);
        settings.showImageBBs = true;
      }
    },
    hide: (map) => {
      map?.removeLayer(bbs);
    },
    remove: (map) => {
      map?.removeLayer(bbs);
    },
  };
}

export default createImageBBs();
