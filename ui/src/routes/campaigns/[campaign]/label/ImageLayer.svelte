<script>
  import { onDestroy } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { mapStore } from "$stores/map/map.svelte.js";
  import createImages from "$stores/images.svelte.js"

  let {
    image,
    options,
    stretch = [0, 3000],
    bands = [4, 3, 2],
    palette = "viridis",
  } = $props();

  let layer = $state(null);
  let current_image_bbox = $state(null);

  $effect(async () => {
    const map = mapStore.map;

    if (!current_image_bbox) current_image_bbox = new L.FeatureGroup();
    else current_image_bbox.clearLayers();
    map.addLayer(current_image_bbox);

    current_image_bbox.eachLayer((layer) => {
      console.log(layer)
        if (layer.annotationId === createImages.current.name) current_image_bbox.removeLayer(layer);
      });
    if (map && image) {
      const url = `${PUBLIC_API_URL}/images/${image}/{z}/{x}/{y}.png?stretch=${stretch}&bands=${bands}&palette=${palette}`;
      if (layer) {
        layer.setUrl(url);
      } else {
        layer = L.tileLayer(url, options).addTo(map);
      }
    }
    addBbox(JSON.parse(await createImages.current.bbox), map)
    zoomIntoImage(JSON.parse(await createImages.current.bbox), mapStore.map);
  });

  const addBbox = (bbox, map) => {
      const image_bbox = L.rectangle(
        [
          [bbox[1], bbox[0]],[bbox[3], bbox[2]]
        ],
        {
          interactive: false,
        }
      )
      image_bbox.annotationId =  createImages.current.name;
      current_image_bbox.addLayer(image_bbox)
  }

  const zoomIntoImage = (image, map) => {
    if (image) {
      const c1 = L.latLng(image[1], image[0]);
      const c2 = L.latLng(image[3], image[2]);

      const bounds = L.latLngBounds(c1, c2);
      map.fitBounds(bounds);
    }
  };


  onDestroy(() => {
    layer?.remove();
  });
</script>