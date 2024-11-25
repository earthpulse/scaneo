<script>
  import images from "$stores/images.svelte.js";
  import labels from "$stores/labels.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import DrawBoxes from "./DrawBoxes.svelte";
  import DrawBrush from "./DrawBrush.svelte";

  let task = $state(null);

  const validate = () => {
    if (!images.current) return alert("Select image");
    if (!labels.current) return alert("Select label");
    return true;
  };

  const classification = async () => {
    if (!validate()) return;
    task = "classification";
    try {
      await annotations.createClassification(labels.current, images.current.id);
    } catch (error) {
      console.error(error);
    }
  };

  const detection = async () => {
    if (!validate()) return;
    task = "detection";
    if (images.current) {
      const data = await annotations.retrieve(images.current.id);
      // draw initial boxes
      drawBoxes.initItems(mapStore.map);
      data?.forEach((annotation) => {
        if (annotation.type === "detection") drawBoxes.addLayer(annotation);
      });
    }
    // annotations.createDetection(labels.current, images.current.id);
    // enable drawing tools
  };
  const segmentation = () => {
    if (!validate()) return;
    task = "segmentation";
    // annotations.createDetection(labels.current, images.current.id);
    // enable drawing tools
  };
</script>

<nav class="flex flex-col gap-2 p-3 border-r bg-bg2 border-border">
  <button class="btn btn-primary" onclick={classification}>
    Classification
  </button>
  <button class="btn btn-primary" onclick={detection}> Detection </button>
  <button class="btn btn-primary" onclick={segmentation}> Segmentation </button>
  <button class="btn btn-primary"> Models </button>
</nav>

{#if task === "detection"}
  <DrawBoxes />
  
{:else if task === "segmentation"}
  <DrawBrush />
{/if}
