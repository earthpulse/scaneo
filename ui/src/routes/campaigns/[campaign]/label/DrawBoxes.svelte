<script>
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawItems from "$stores/map/drawItems.svelte.js";
  //   import { tick } from "svelte";
  import { onDestroy } from "svelte";

  $effect(async () => {
    console.log("drawBoxes");
    const leafletDraw = await import("leaflet-draw/dist/leaflet.draw.js");
    await import("leaflet-draw/dist/leaflet.draw.css");
    // await tick();

    const map = mapStore.map;
    drawItems.init(map);
    // return () => {
    //   console.log("remove drawItems");
    //   drawItems.remove(map);
    // };
  });

  onDestroy(() => {
    console.log("onDestroy drawItems");
    drawItems.remove(mapStore.map);
  });
</script>
