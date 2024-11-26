<script>
  import imageBBs from "$stores/map/imageBBs.svelte.js";
  import settings from "$stores/settings.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";

  $effect(() => {
    settings.init();
  });
</script>

<section class="flex flex-col gap-4">
  <h1>Settings</h1>
  <span>
    <input
      id="show-image-bboxes"
      type="checkbox"
      checked={settings.showImageBBs}
      onchange={() => imageBBs.toggle(mapStore.map)}
    />
    <label for="show-image-bboxes">Show image bboxes</label>
  </span>
  <button onclick={() => imageBBs.zoom(mapStore.map)} class="btn"
    >Reset map</button
  >
</section>
