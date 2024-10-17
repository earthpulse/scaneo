<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import campaigns from "$stores/campaigns.svelte.js";

  $effect(() => {
    campaigns.retrieveOne($page.params.campaign);
  });

  const deleteCampaign = () => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      campaigns.delete($page.params.campaign);
      goto("/campaigns");
    }
  };
</script>

<p>Name: {campaigns.current?.name}</p>
<p>Description: {campaigns.current?.description}</p>

<div class="flex flex-row gap-3">
  <button class="btn btn-primary">Update sources (manually)</button>
  <button class="btn btn-primary" onclick={deleteCampaign}>Delete</button>
  <a href="/campaigns/{$page.params.campaign}/label" class="btn btn-primary"
    >Label</a
  >
  <a href="/campaigns/{$page.params.campaign}/export" class="btn btn-primary"
    >Export</a
  >
</div>
