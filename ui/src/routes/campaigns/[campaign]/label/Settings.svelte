<script>
  import imageBBs from "$stores/map/imageBBs.svelte.js";
  import settings from "$stores/settings.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import CheckboxMultipleMarkedOutline from "svelte-material-icons/CheckboxMultipleMarkedOutline.svelte";
  import Loupe from "svelte-material-icons/Loupe.svelte";

  $effect(() => {
    settings.init();
  });
</script>

<section class="flex flex-row gap-2">
  <span>
    <button
      class="btn btn-sm tooltip flex items-center p-2 {settings.showImageBBs
        ? 'btn-primary'
        : 'btn-outline'}"
      data-tip="{settings.showImageBBs ? 'Hide' : 'Show'} bbs"
      onclick={() => imageBBs.toggle(mapStore.map)}
    >
      <CheckboxMultipleMarkedOutline size="15" />
    </button>
  </span>
  <button
    onclick={() => imageBBs.zoom(mapStore.map)}
    class="btn btn-sm btn-outline tooltip tooltip-left flex items-center p-2"
    data-tip="Reset map"><Loupe size="15" /></button
  >
</section>
