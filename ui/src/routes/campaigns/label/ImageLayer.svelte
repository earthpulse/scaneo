<script>
  import { mapStore } from "$stores/map/map.svelte.js";
  import images from "$stores/images.svelte.js";
  import campaigns from "$stores/campaigns.svelte.js";
  import imageBBs from "$stores/map/imageBBs.svelte.js";
  import settings from "$stores/settings.svelte.js";
  import { onDestroy } from "svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";

  let { options, palette = "viridis" } = $props();

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

  $inspect(campaigns.current);

  $effect(() => {
    const map = mapStore.map;
    if (map && images.current) {
      images.zoom(images.current.bbox, map);
      let url = `${baseUrl.api_url}/images/${campaigns.current.path}/${images.current.path}/{z}/{x}/{y}.png?stretch=${settings.stretch}&bands=${settings.rgb}&palette=${palette}`;
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
