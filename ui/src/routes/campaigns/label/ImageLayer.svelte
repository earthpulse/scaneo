<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import { mapStore } from "$stores/map/map.svelte.js";
  import images from "$stores/images.svelte.js";
  import imageBBs from "$stores/map/imageBBs.svelte.js";
  import settings from "$stores/settings.svelte.js";
  import { onDestroy } from "svelte";
  import campaigns from "$stores/campaigns.svelte.js";

  let {
    options,
    stretch = [0, 3000],
    bands = [4, 3, 2],
    palette = "viridis",
  } = $props();

  let layer = $state(null);
  let initialized = $state(false);

  $effect(() => {
    const map = mapStore.map;
    if (map) {
      if (!initialized) {
        imageBBs.initItems(map);
        images.data.forEach((image) => {
          imageBBs.addBbox(image, map);
        });
        imageBBs.zoom(map);
      }
      if (!settings.showImageBBs) {
        imageBBs.hide(map);
      }
      if (images.data.length > 0) {
        initialized = true;
      }
    }
  });

  $effect(() => {
    const map = mapStore.map;
    if (map && images.current) {
      images.zoom(images.current.bbox, map);
      let url = `${PUBLIC_API_URL}/images/${images.current.path}/{z}/{x}/{y}.png?stretch=${stretch}&bands=${bands}&palette=${palette}`;
      if (campaigns.current.eotdlDatasetId) {
        url += `&eotdlDatasetId=${campaigns.current.eotdlDatasetId}`;
      }
      if (layer) {
        layer.setUrl(url);
      } else {
        layer = L.tileLayer(url, options).addTo(map);
      }
    }
  });

  onDestroy(() => {
    imageBBs.remove(mapStore.map);
    initialized = false;
  });
</script>
