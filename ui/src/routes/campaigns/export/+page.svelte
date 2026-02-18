<script>
  import { page } from "$app/stores";
  import campaigns from "$stores/campaigns.svelte.js";
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let disabled = $derived(campaigns.exporting);
  let exportType = $state("folder");
  let exportPath = $state("");

  $effect(() => {
    if (browser) {
      campaigns.retrieveOne($page.url.searchParams.get("id"));
    }
  });

  const exportCampaign = (e) => {
    if (exportType === "folder" && !exportPath) {
      if (campaigns.current?.path) {
        exportPath = `${campaigns.current?.path}/labels`.replace(/[\\/]+/g, '/');
      }
      else {
        return;
      }
    }
    e.preventDefault();
    try {
      campaigns.export(
        $page.url.searchParams.get("id"),
        exportType,
        exportPath,
      );
    } catch (e) {
      alert(e.message);
    }
  };

  const cancel = () => {
    campaigns.cancel();
  };

  onDestroy(() => {
    campaigns.reset();
  });
</script>

<div class="w-full max-w-2xl p-6 mx-auto">
  <form class="flex flex-col gap-4" onsubmit={exportCampaign}>
    {#if campaigns.current?.path}
      <p>Your annotations will be exported at: {campaigns.current?.path}</p>
    {:else if campaigns.current?.eotdlDatasetId}
      <p>This is an EOTDL dataset. Choose one export option:</p>
      <!-- <div class="form-control">
        <label class="cursor-pointer gap-2 flex flex-row items-center">
          <input
            type="radio"
            name="export-type"
            class="radio radio-xs"
            value="eotdl"
            bind:group={exportType}
          />
          <span class="label-text">Export to EOTDL</span>
        </label>
      </div> -->
      <div class="form-control">
        <label class="cursor-pointer gap-2 flex flex-row items-center">
          <input
            type="radio"
            name="export-type"
            class="radio radio-xs"
            value="folder"
            bind:group={exportType}
          />
          <span class="label-text"
            >Export to local folder (only annotations)</span
          >
        </label>
        {#if exportType === "folder"}
          <input
            type="text"
            class="input input-bordered w-full mt-2"
            bind:value={exportPath}
            placeholder="Enter export path"
            required
          />
        {/if}
      </div>
    {:else}
      <p>Something went wrong :</p>
    {/if}
    <p>Images: {campaigns.current?.image_count}</p>
    <p>Annotations: {campaigns.current?.annotation_count}</p>
    {#if campaigns.completed}
      <div class="flex flex-row justify-between alert">
        <p>Campaign exported successfully !</p>
      </div>
    {:else if campaigns.exporting}
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-sm">{campaigns.message}</span>
          <button type="button" class="btn btn-sm btn-error" onclick={cancel}>
            Cancel
          </button>
        </div>
        <progress
          class="w-full progress progress-primary"
          value={isNaN(campaigns.progress) ? 0 : campaigns.progress * 100}
          max="100"
        ></progress>
      </div>
    {:else}
      <button class="btn btn-outline" type="submit" {disabled}
        >Export campaign</button
      >
    {/if}
  </form>
</div>
