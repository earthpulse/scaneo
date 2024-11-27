<script>
  import Labels from "./Labels.svelte";
  import Annotations from "./Annotations.svelte";
  import FileExplorer from "./FileExplorer.svelte";
  import { onDestroy } from "svelte";
  import labels from "$stores/labels.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";

  let selected = $state("labels");

  onDestroy(() => {
    labels.reset();
    drawBoxes.remove(mapStore.map);
    annotations.reset();
  });
</script>

<div
  class="flex flex-col p-3 border-l bg-bg2 border-border w-[300px] h-full justify-between"
>
  <div class="h-[250px]">
    <FileExplorer />
  </div>
  <div class="flex flex-col flex-1 h-full">
    <div class="w-full h-[2px] bg-slate-500 rounded-full my-2"></div>
    <span class="flex gap-4">
      <button
        class="pb-1 {selected === 'labels' ? 'border-b-2 border-primary' : ''}"
        onclick={() => (selected = "labels")}>Labels</button
      >
      <button
        class="pb-1 {selected === 'annotations'
          ? 'border-b-2 border-primary'
          : ''}"
        onclick={() => (selected = "annotations")}>Annotations</button
      >
    </span>
    {#if selected === "labels"}
      <Labels />
    {/if}
    {#if selected === "annotations"}
      <Annotations />
    {/if}
  </div>
</div>
