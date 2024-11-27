<script>
  import images from "$stores/images.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import labels from "$stores/labels.svelte.js";

  import { mapStore } from "$stores/map/map.svelte.js";
  import DeleteOutline from "svelte-material-icons/DeleteOutline.svelte";

  $effect(async () => {
    if (images.current) {
      const data = await annotations.retrieve(images.current.id);
      // draw initial boxes
      drawBoxes.initItems(mapStore.map);
      drawBrush.initItems(mapStore.map);
      data?.forEach((annotation) => {
        if (annotation.type === "detection") drawBoxes.addLayer(annotation);
        if (annotation.type === "segmentation") drawBrush.addLayer(annotation);
      });
    }
  });

  const deleteAnnotation = (id) => {
    if (
      confirm(
        "Are you sure you want to delete this annotation? This action is irreversible."
      )
    ) {
      annotations.delete(id);
      drawBoxes.removeLayer(id);
      drawBrush.removeLayer(id);
    }
  };
</script>

<section class="flex flex-col flex-1 h-full overflow-hidden">
  {#if annotations.data.length == 0}
    <p>No annotations found</p>
  {:else}
    <div class="flex-grow overflow-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="sticky top-0 text-left bg-bg2">Label</th>
            <th class="sticky top-0 text-left bg-bg2">Type</th>
            <th class="sticky top-0 bg-bg2"></th>
          </tr>
        </thead>
        <tbody>
          {#each annotations.data as annotation}
            <tr class="h-8 hover:bg-slate-100">
              <td>{annotation.value}</td>
              <td>{annotation.type}</td>
              <td class="w-8">
                <button
                  class="px-2 hover:text-red-600"
                  onclick={() => deleteAnnotation(annotation.id)}
                >
                  <DeleteOutline size="15" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>
