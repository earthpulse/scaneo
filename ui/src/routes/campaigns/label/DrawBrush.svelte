<script>
  import images from "$stores/images.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import drawPoints from "$stores/map/drawPoints.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import { onDestroy } from "svelte";

  $effect(async () => {
    const leafletPolygon = await import(
      "leaflet-paintpolygon/dist/Leaflet.PaintPolygon.js"
    );
    // await tick();

    const map = mapStore.map;
    drawBoxes.remove(map);
    drawPoints.remove(map);
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
    drawBrush.remove(mapStore.map);
  });
</script>
