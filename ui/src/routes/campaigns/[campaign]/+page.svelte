<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import campaigns from "$stores/campaigns.svelte.js";
  import LabelBtn from "$components/LabelBtn.svelte";
  import ExportBtn from "$components/ExportBtn.svelte";
  import DeleteBtn from "$components/DeleteBtn.svelte";
  import UpdateBtn from "$components/UpdateBtn.svelte";

  $effect(() => {
    campaigns.retrieveOne($page.params.campaign);
  });

  const deleteCampaign = () => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      campaigns.delete($page.params.campaign);
      goto("/campaigns");
    }
  };

  const updateCampaign = () => {
    console.log("update sources");
  };
</script>

<div class="container mx-auto p-6">
  <!-- Header section with campaign name and actions -->
  <div class="mb-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">
        {campaigns.current?.name || "Loading campaign..."}
      </h1>

      <div class="flex flex-row gap-3">
        <LabelBtn link={`/campaigns/${$page.params.campaign}/label`} />
        <ExportBtn link={`/campaigns/${$page.params.campaign}/export`} />
        <UpdateBtn onclick={updateCampaign} />
        <DeleteBtn onclick={deleteCampaign} />
      </div>
    </div>

    {#if campaigns.current?.description}
      <p class="mt-2 text-gray-600">
        {campaigns.current.description}
      </p>
    {/if}
  </div>

  <!-- Campaign details section -->
  <div class="bg-white rounded-lg shadow-sm p-6 border border-1">
    <div class="grid grid-cols-1 gap-4">
      <div class="border-b pb-4">
        <h2 class="text-sm font-semibold text-gray-600 uppercase mb-2">
          Details
        </h2>
        <div class="space-y-3">
          <div class="flex">
            <span class="font-medium w-32">Name:</span>
            <span class="text-gray-700">{campaigns.current?.name || "-"}</span>
          </div>
          <div class="flex">
            <span class="font-medium w-32">Description:</span>
            <span class="text-gray-700"
              >{campaigns.current?.description ||
                "No description provided"}</span
            >
          </div>
          <div class="flex">
            <span class="font-medium w-32">Images:</span>
            <span class="text-gray-700">TODO: add number of images</span>
          </div>
          <div class="flex">
            <span class="font-medium w-32">Annotations:</span>
            <span class="text-gray-700">TODO: add number of annotations</span>
          </div>
          <div class="flex">
            <span class="font-medium w-32">Labels:</span>
            <span class="text-gray-700">TODO: add label editor</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
