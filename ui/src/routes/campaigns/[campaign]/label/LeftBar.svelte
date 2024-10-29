<script>
  import images from "$stores/images.svelte.js";
  import labels from "$stores/labels.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import DrawBoxes from "./DrawBoxes.svelte";

  let task = $state(null);

  const validate = () => {
    if (!images.current) return alert("Select image");
    if (!labels.current) return alert("Select label");
    return true;
  };

  const classification = () => {
    if (!validate()) return;
    task = "classification";
    annotations.createClassification(labels.current, images.current.id);
  };

  const detection = () => {
    if (!validate()) return;
    task = "detection";
    // annotations.createDetection(labels.current, images.current.id);
    // enable drawing tools
  };
</script>

<nav class="flex flex-col gap-2 bg-bg2 border-r border-border p-3">
  <button class="btn btn-primary" onclick={classification}>
    Classification
  </button>
  <button class="btn btn-primary" onclick={detection}> Detection </button>
  <button class="btn btn-primary"> Segmentation </button>
  <button class="btn btn-primary"> Models </button>
</nav>

{#if task === "detection"}
  <DrawBoxes />
{/if}
