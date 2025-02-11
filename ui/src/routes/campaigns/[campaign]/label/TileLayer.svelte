<script>
  import { getContext } from "svelte";

  let { url, options } = $props();

  const { getMap } = getContext("map");

  let layer = null;

  $effect(() => {
    const map = getMap();
    if (map) {
      layer = L.tileLayer(url, options).addTo(map);
    }
    return () => layer?.remove();
  });
</script>
