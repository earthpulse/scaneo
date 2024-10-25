<script>
  import { page } from "$app/stores";

  import Labels from "./Labels.svelte";
  import Annotations from "./Annotations.svelte";
  import Settings from "./Settings.svelte";
  import images from "$stores/images.svelte.js";

  $effect(() => {
    images.retrieve($page.params.campaign);
  });
</script>

<div
  class="flex flex-col gap-2 bg-bg2 border-l border-border p-3 justify-between"
>
  <div>
    <h2>images</h2>
    {#each images.data as image}
      <p>{image.path}</p>
    {/each}
  </div>
  <Annotations />
  <Labels />
  <Settings />
</div>
