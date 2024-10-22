<script>
  import { page } from "$app/stores";

  import TopBar from "./TopBar.svelte";
  import LeftBar from "./LeftBar.svelte";
  import RightBar from "./RightBar.svelte";
  import images from "$stores/images.svelte.js";
  import MapContainer from "./MapContainer.svelte";
  
  $effect(() => {
    images.retrieve($page.params.campaign);
  });
</script>

<div class="flex flex-col flex-1 h-full">
  <TopBar />
  <div class="flex flex-row flex-1 w-full h-full">
    <LeftBar />
    <div class="flex-1">
      <MapContainer/>
    </div>
    <RightBar />
  </div>
</div>
