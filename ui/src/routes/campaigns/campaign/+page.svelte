<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  import campaigns from "$stores/campaigns.svelte.js";
  import models from "$stores/models.svelte.js";
  import labelMappings from "$stores/label_mappings.svelte.js";
  import labels from "$stores/labels.svelte.js";
  import LabelBtn from "$components/LabelBtn.svelte";
  import ExportBtn from "$components/ExportBtn.svelte";
  import DeleteBtn from "$components/DeleteBtn.svelte";
  import UpdateBtn from "$components/UpdateBtn.svelte";
  import Labels from "../label/Labels.svelte";
  import ModelSelector from "../create/ModelSelector.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";

  let parsedLabelMappings = $state({});
  let campaignId = $state("");

  $effect(() => {
    if (browser) {
      campaignId = $page.url.searchParams.get("id");
    }
  });

  $effect(() => {
    campaigns.retrieveOne(campaignId);
    models.retrieve();
    labels.retrieve(campaignId);
    labelMappings.retrieve(campaignId);
  });

  $effect(() => {
    parsedLabelMappings = labelMappings.data?.reduce((acc, mapping) => {
      if (!acc[mapping.modelId]) {
        acc[mapping.modelId] = {};
      }
      acc[mapping.modelId][
        labels.data?.find((l) => l.id == mapping.labelId)?.name
      ] = mapping.output_index;
      return acc;
    }, {});
  });

  const deleteCampaign = () => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      campaigns.delete(campaignId);
      goto(`${baseUrl.url}/campaigns`);
    }
  };

  const updateCampaign = () => {
    console.log("update sources");
  };

  const onclick = async () => {
    try {
      await labelMappings.update(campaignId, parsedLabelMappings);
    } catch (err) {
      alert(err);
    }
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
        <LabelBtn link={`${baseUrl.url}/campaigns/label?id=${campaignId}`} />
        <ExportBtn link={`${baseUrl.url}/campaigns/export?id=${campaignId}`} />
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
            <span class="text-gray-700">{campaigns.current?.image_count}</span>
          </div>
          <div class="flex">
            <span class="font-medium w-32">Annotations:</span>
            <span class="text-gray-700"
              >{campaigns.current?.annotation_count}</span
            >
          </div>
          <div class="flex flex-col">
            <span class="font-medium w-32">Labels:</span>
            <div>
              <Labels />
            </div>
          </div>
          <div class="flex flex-col">
            <ModelSelector
              labels={labels.data}
              bind:labelMappings={parsedLabelMappings}
              {onclick}
              ondelete={onclick}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
