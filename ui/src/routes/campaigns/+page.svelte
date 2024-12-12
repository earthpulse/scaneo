<script>
  import campaigns from "$stores/campaigns.svelte.js";
  import CreateCard from "$components/CreateCard.svelte";
  import LabelBtn from "$components/LabelBtn.svelte";
  import ExportBnt from "$components/ExportBtn.svelte";
  import ManageBnt from "$components/ManageBnt.svelte";
  import Loader from "$components/Loader.svelte";
  import ErrorMsg from "$components/ErrorMsg.svelte";
  import Card from "$components/Card.svelte";
  import DeleteBnt from "$components/DeleteBtn.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";

  $effect(() => {
    campaigns.retrieve();
  });

  const deleteCampaign = (campaing) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      campaigns.delete(campaing);
    }
  };
</script>

<div class="p-6 max-w-7xl mx-auto w-full">
  {#if campaigns.loading}
    <Loader />
  {:else if campaigns.error}
    <ErrorMsg error={campaigns.error} />
  {:else}
    <h1 class="text-3xl font-bold mb-8">Campaigns</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateCard
        title="Create Campaign"
        description="Start a new campaign and begin labelling data"
        link={`${baseUrl.url}/campaigns/create`}
      />
      {#each campaigns.data as campaign}
        <Card name={campaign.name} description={campaign.description}>
          <div class="card-actions flex flex-row gap-2 mt-6 justify-between">
            <span class="flex flex-row gap-2">
              <LabelBtn
                link={`${baseUrl.url}/campaigns/label?id=${campaign.id}`}
              />
              <ExportBnt
                link={`${baseUrl.url}/campaigns/export?id=${campaign.id}`}
              />
            </span>
            <span class="flex flex-row gap-2">
              <DeleteBnt onclick={() => deleteCampaign(campaign.id)} />
              <ManageBnt
                link={`${baseUrl.url}/campaigns/campaign?id=${campaign.id}`}
              />
            </span>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
