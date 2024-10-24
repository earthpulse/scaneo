<script>
  import { page } from "$app/stores";
  import TopBar from "./TopBar.svelte";
  import LeftBar from "./LeftBar.svelte";
  import Map from "./Map.svelte";
  import RightBar from "./RightBar.svelte";
  import images from "$stores/images.svelte.js";
  import TileLayer from "./TileLayer.svelte";
  import LayersControl from "./LayersControl.svelte";

  $effect(() => {
    images.retrieve($page.params.campaign);
  });

  let layer = $state("streets");
</script>

<div class="h-full flex-1 flex flex-col">
  <TopBar />
  <div class="flex flex-row w-full h-full flex-1">
    <LeftBar />
    <div class="flex-1">
      <Map position={[42.0407, 3.1]} zoom={4}>
        {#if layer == "streets"}
          <TileLayer
            url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"}
            options={{ maxZoom: 20, zIndex: 1 }}
          />
        {:else if layer == "satellite"}
          <TileLayer
            url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
            options={{ maxZoom: 20, zIndex: 1 }}
          />
        {/if}
        <LayersControl layers={["streets", "satellite"]} bind:layer />
      </Map>
    </div>
    <RightBar />
  </div>
</div>
