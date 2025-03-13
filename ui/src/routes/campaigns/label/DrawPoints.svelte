<script>
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import drawPoints from "$stores/map/drawPoints.svelte";
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
    drawBoxes.remove(map);
    drawPoints.initControls(map);
    drawPoints.initItems(mapStore.map);
    data?.forEach((annotation) => {
      console.log(annotation);
      if (annotation.type === "points") drawPoints.addLayer(annotation);
    });
  });

  onDestroy(() => {
    drawPoints.remove(mapStore.map);
  });
</script>
