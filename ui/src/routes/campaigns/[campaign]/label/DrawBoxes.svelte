<script>
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  //   import { tick } from "svelte";
  import { onDestroy } from "svelte";

  $effect(async () => {
    console.log("drawBoxes");
    const leafletDraw = await import("leaflet-draw/dist/leaflet.draw.js");
    await import("leaflet-draw/dist/leaflet.draw.css");
    // await tick();

    const map = mapStore.map;
    drawBoxes.initControls(map);
    // return () => {
    //   console.log("remove drawBoxes");
    //   drawBoxes.remove(map);
    // };
  });

  onDestroy(() => {
    console.log("onDestroy drawBoxes");
    drawBoxes.remove(mapStore.map);
  });
</script>
