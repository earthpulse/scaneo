<script>
  import images from "$stores/images.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import { onDestroy } from "svelte";

  $effect(async () => {
    console.log("drawBrush");
    const leafletPolygon = await import("leaflet-paintpolygon/dist/Leaflet.PaintPolygon.js");
    // await tick();

    const map = mapStore.map;
    drawBrush.initControls(map);
    drawBrush.initItems(map);
    const data = await annotations.retrieve(images.current.id);
    data?.forEach((annotation) => {
        if (annotation.type === "segmentation") drawBrush.addLayer(annotation);
      });
          // return () => {
    //   console.log("remove drawBoxes");
    //   drawBoxes.remove(map);
    // };
  });

  onDestroy(() => {
    console.log("onDestroy drawBrush");
    drawBrush.remove(mapStore.map);
  });
</script>