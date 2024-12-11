<script>
  import { page } from "$app/stores";
  import campaigns from "$stores/campaigns.svelte.js";
  import { onDestroy } from "svelte";

  let disabled = $state(false);

  $effect(() => {
    campaigns.retrieveOne($page.url.searchParams.get("id"));
  });

  const exportCampaign = (e) => {
    e.preventDefault();
    try {
      disabled = true;
      campaigns.export($page.url.searchParams.get("id"));
    } catch (e) {
      alert(e.message);
    }
  };

  const cancel = () => {
    campaigns.cancel();
    disabled = false;
  };

  onDestroy(() => {
    campaigns.reset();
  });
</script>

<div class="w-full max-w-2xl p-6 mx-auto">
  <form class="flex flex-col gap-4" onsubmit={exportCampaign}>
    <p>Your annotations will be exported at: {campaigns.current?.path}</p>
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
