<script>
  import TopBar from "./TopBar.svelte";
  import LeftBar from "./LeftBar.svelte";
  import Map from "./Map.svelte";
  import RightBar from "./RightBar.svelte";
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
