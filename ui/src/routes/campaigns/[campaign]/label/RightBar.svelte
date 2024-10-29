<script>
  import { page } from "$app/stores";

  import Labels from "./Labels.svelte";
  import Annotations from "./Annotations.svelte";
  import Settings from "./Settings.svelte";
  import images from "$stores/images.svelte.js";
  import FileExplorer from "./FileExplorer.svelte";

  $effect(() => {
    images.retrieve($page.params.campaign);
  });
</script>

<div
  class="flex flex-col justify-between gap-2 p-3 border-l bg-bg2 border-border"
>
  <div>
    <h2>images</h2>
    <div class="w-60">
      <FileExplorer />
    </div>
  </div>
  <Annotations />
  <Labels />
  <Settings />
</div>
