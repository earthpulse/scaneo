<script>
  import TopBar from "./TopBar.svelte";
  import LeftBar from "./LeftBar.svelte";
  import Map from "./Map.svelte";
  import RightBar from "./RightBar.svelte";
  import TileLayer from "./TileLayer.svelte";
  import LayersControl from "./LayersControl.svelte";
  import images from "$stores/images.svelte.js";
  import ImageLayer from "./ImageLayer.svelte";
  
  let layer = $state("streets");
</script>

<div class="flex flex-col flex-1 h-full">
  <TopBar />
  <div class="flex flex-row flex-1 w-full h-full">
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

{#if images.data}
  <ImageLayer/>
{/if}
