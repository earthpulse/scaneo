<script>
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import images from "$stores/images.svelte.js";

  //   import { tick } from "svelte";
  import { onDestroy } from "svelte";

  $effect(async () => {
    const leafletDraw = await import("leaflet-draw/dist/leaflet.draw.js");
    await import("leaflet-draw/dist/leaflet.draw.css");
    // await tick();
    const data = await annotations.retrieve(images.current.id);
    const map = mapStore.map;
    drawBrush.remove(map);
    drawBoxes.initControls(map);
    drawBoxes.initItems(mapStore.map);
    data?.forEach((annotation) => {
      if (annotation.type === "detection") drawBoxes.addLayer(annotation);
    });
  });

  onDestroy(() => {
    drawBoxes.remove(mapStore.map);
  });
</script>
