<script>
  import campaigns from "$stores/campaigns.svelte.js";

  $effect(() => {
    campaigns.retrieve();
  });
</script>

<div class="p-3">
  {#if campaigns.loading}
    <p>Loading...</p>
  {:else if campaigns.error}
    <p>Error: {campaigns.error}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Create Campaign</h2>
          <p>Create a new campaign</p>
          <a class="btn btn-primary" href="/campaigns/create">Create</a>
        </div>
      </div>
      {#each campaigns.data as campaign}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{campaign.name}</h2>
            <p>{campaign.description}</p>
            <div
              class="card-actions flex flex-row justify-between items-center"
            >
              <div>
                <a class="btn" href="/campaigns/{campaign.id}">Manage</a>
                <a class="btn" href="/campaigns/{campaign.id}/label">Label</a>
                <a class="btn" href="/campaigns/{campaign.id}/export">Export</a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
