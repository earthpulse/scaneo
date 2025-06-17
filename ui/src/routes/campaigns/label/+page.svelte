<script>
  import TopBar from "./TopBar.svelte";
  import Map from "./Map.svelte";
  import RightBar from "./RightBar.svelte";
  import TileLayer from "./TileLayer.svelte";
  import LayersControl from "./LayersControl.svelte";
  import images from "$stores/images.svelte.js";
  import ImageLayer from "./ImageLayer.svelte";
  import campaigns from "$stores/campaigns.svelte.js";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  let layer = $state("streets");

  $effect(() => {
    if (browser) {
      campaigns.retrieveOne($page.url.searchParams.get("id"));
    }
  });
</script>

<div class="flex flex-col flex-1 h-full">
  <TopBar />
  <div class="flex flex-row flex-1 w-full h-full">
    <div class="flex-1">
      <Map position={[42.0407, 3.1]} zoom={4}>
        {#if layer == "streets"}
          <TileLayer
            url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"}
            options={{ maxZoom: 40, zIndex: 1 }}
          />
        {:else if layer == "satellite"}
          <TileLayer
            url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
            options={{ maxZoom: 40, zIndex: 1 }}
          />
        {/if}
        <LayersControl layers={["streets", "satellite"]} bind:layer />
      </Map>
    </div>
    <div class="w-[300px]">
      <RightBar />
    </div>
  </div>
</div>

{#if images.data}
  <ImageLayer options={{ maxZoom: 20, zIndex: 2 }} />
{/if}
