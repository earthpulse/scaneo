<script>
  import models from "$stores/models.svelte.js";
  import images from "$stores/images.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import RobotOutline from "svelte-material-icons/RobotOutline.svelte";
  import Divider from "./Divider.svelte";
  import { page } from "$app/stores";
  let selected_model = $state(null);
  let disabled = $state(false);

  $effect(() => {
    models.retrieve($page.params.campaign);
  });

  const inference = async () => {
    if (!images.current) return alert("Select image");
    if (!selected_model) return alert("Select model");
    disabled = true;
    try {
      // call model in backend, save and return annotation
      const data = await models.inference(selected_model, images.current.id);
      // add annotation to map and list (already in backend)
      // add geojson to map
      mapStore.map.addLayer(L.geoJSON(data));
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      disabled = false;
    }
  };
</script>

{#if models.data?.length > 0}
  <Divider />
  <select class="select select-sm" bind:value={selected_model}>
    <option value={null} disabled>Select a model</option>
    {#each models.data as model}
      <option value={model.id}>{model.name}</option>
    {/each}
  </select>
  <button
    class="btn btn-sm tooltip flex items-center p-2 btn-outline"
    data-tip="Run model inference"
    onclick={inference}
    {disabled}><RobotOutline size="15" /></button
  >
{/if}
