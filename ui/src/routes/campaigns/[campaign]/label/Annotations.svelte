<script>
  import images from "$stores/images.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import { onDestroy } from "svelte";

  $effect(async () => {
    if (images.current) {
      const data = await annotations.retrieve(images.current.id);
      // draw initial boxes
      drawBoxes.initItems(mapStore.map);
      data?.forEach((annotation) => {
        if (annotation.type === "detection") drawBoxes.addLayer(annotation);
      });
    }
  });

  onDestroy(() => {
    drawBoxes.remove(mapStore.map);
  });

  const deleteAnnotation = (id) => {
    annotations.delete(id);
    drawBoxes.removeLayer(id);
  };
</script>

<section>
  <h1>Annotations</h1>
  {#if annotations.data.length == 0}
    <p>No annotations found</p>
  {:else}
    <div>
      {#each annotations.data as annotation}
        <span class="flex flex-row gap-2">
          <p>{annotation.value}</p>
          <p>{annotation.type}</p>
          <button
            onclick={() => deleteAnnotation(annotation.id)}
            class="btn btn-error">Delete</button
          >
        </span>
      {/each}
    </div>
  {/if}
</section>
