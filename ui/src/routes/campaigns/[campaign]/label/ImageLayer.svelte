<script>
  import { onDestroy } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { mapStore } from "$stores/map/map.svelte.js";

  let {
    image,
    options,
    stretch = [0, 3000],
    bands = [4, 3, 2],
    palette = "viridis",
  } = $props();

  let layer = $state(null);

  $effect(() => {
    const map = mapStore.map;
    if (map && image) {
      const url = `${PUBLIC_API_URL}/images/${image}/{z}/{x}/{y}.png?stretch=${stretch}&bands=${bands}&palette=${palette}`;
      if (layer) {
        layer.setUrl(url);
      } else {
        layer = L.tileLayer(url, options).addTo(map);
      }
    }
  });

  onDestroy(() => {
    layer?.remove();
  });
</script>
