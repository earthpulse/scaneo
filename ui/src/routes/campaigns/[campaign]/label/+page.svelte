<script>
  import { page } from "$app/stores";

  import TopBar from "./TopBar.svelte";
  import LeftBar from "./LeftBar.svelte";
  import Map from "./Map.svelte";
  import RightBar from "./RightBar.svelte";
  import images from "$stores/images.svelte.js";

  $effect(() => {
    images.retrieve($page.params.campaign);
  });
</script>

<div class="h-full flex-1 flex flex-col">
  <TopBar />
  <div class="flex flex-row w-full h-full flex-1">
    <LeftBar />
    <div class="flex-1">
      <Map />
    </div>
    <RightBar />
  </div>
</div>
