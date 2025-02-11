<script>
  import campaigns from "$stores/campaigns.svelte.js";
  import plugins from "$stores/plugins.svelte.js";
  import S3StorageParams from "./S3StorageParams.svelte";
  import EOTDLDatasetSelector from "./EOTDLDatasetSelector.svelte";
  import ModelSelector from "./ModelSelector.svelte";
  import LabelGenerator from "./LabelGenerator.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";
  import { onDestroy } from "svelte";

  let name = $state("");
  let description = $state("");
  let localPath = $state("");
  let storageOption = $state(0);
  let eotdlDatasetId = $state("");
  let labels = $state([]);
  let labelMappings = $state({});

  const createCampaign = async (e) => {
    e.preventDefault();
    if (storageOption == 2) {
      if (!eotdlDatasetId) return alert("EOTDL dataset is required");
      try {
        campaigns.createEOTDL(
          name,
          description,
          eotdlDatasetId,
          labels,
          labelMappings
        );
      } catch (error) {
        alert(error);
      }
    } else {
      if (storageOption == 1) return alert("S3 not implemented yet");
      if (name !== "" && description !== "") {
        try {
          campaigns.create(name, description, localPath, labels, labelMappings);
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  // const importCampaign = async () => {
  //   if (name !== "" && description !== "") {
  //     try {
  //       campaigns.import(name, description, localPath);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // };

  const cancel = () => {
    campaigns.cancel();
  };

  $effect(() => {
    campaigns.reset();
  });

  onDestroy(() => {
    campaigns.reset();
  });
</script>

<div class="w-full max-w-2xl p-6 mx-auto">
  <h1 class="mb-6 text-3xl font-bold">Create a new labelling campaign</h1>

  <form class="flex flex-col gap-4" onsubmit={createCampaign}>
    <div class="form-control">
      <label for="campaign-name" class="mb-1 font-medium label"
        >Campaign Name</label
      >
      <input
        id="campaign-name"
        required
        type="text"
        class="w-full input input-bordered"
        bind:value={name}
        placeholder="Enter campaign name"
      />
    </div>

    <div class="form-control">
      <label for="campaign-description" class="mb-1 font-medium label"
        >Campaign Description</label
      >
      <input
        id="campaign-description"
        required
        type="text"
        class="w-full input input-bordered"
        bind:value={description}
        placeholder="Enter campaign description"
      />
    </div>

    <div class="form-control">
      <label class="mb-2 font-medium label">Select Storage</label>
      <div class="flex flex-wrap gap-2">
        <button
          class="btn btn-outline {storageOption === 0 ? 'btn-primary' : ''}"
          type="button"
          onclick={() => (storageOption = 0)}>Local</button
        >
        <button
          class="btn btn-outline tooltip {storageOption === 1
            ? 'btn-primary'
            : ''}"
          type="button"
          data-tip="Coming soon"
          onclick={() => {
            // storageOption = 1
            console.log("Coming soon");
          }}>Cloud (S3)</button
        >
        {#if plugins.data.find((p) => p.name == "eotdl")?.enabled}
          <button
            class="btn btn-outline {storageOption === 2 ? 'btn-primary' : ''}"
            type="button"
            onclick={() => (storageOption = 2)}>EOTDL</button
          >
        {/if}
      </div>
    </div>

    {#if storageOption == 0}
      <div class="form-control">
        <label class="mb-1 font-medium label">Local Folder Path</label>
        <input
          type="text"
          class="w-full input input-bordered"
          placeholder="Enter folder path"
          required
          bind:value={localPath}
        />
      </div>
    {:else if storageOption == 1}
      <S3StorageParams />
    {:else}
      <EOTDLDatasetSelector bind:eotdlDatasetId />
    {/if}

    <LabelGenerator bind:labels />
    {#if labels.length > 0}
      <ModelSelector {labels} bind:labelMappings />
    {/if}

    {#if campaigns.completed}
      <div class="flex flex-row justify-between alert">
        <p>Campaign created successfully !</p>

        <a
          href={`${baseUrl.url}/campaigns/label?id=${campaigns.data[0]?.id}`}
          class="btn btn-primary">Label</a
        >
      </div>
    {:else if campaigns.creating}
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
      <div
        class="flex w-full gap-4 mt-4 md:w-auto md:self-end {campaigns.creating
          ? 'hidden'
          : ''}"
      >
        <!-- <button
          class="btn btn-primary md:w-auto md:self-end"
          type="button"
          onclick={() => importCampaign()}
          disabled={campaigns.creating}
        >
          {campaigns.creating ? "Creating..." : "Import Campaign"}
        </button> -->

        <button
          class="btn btn-primary md:w-auto md:self-end"
          type="submit"
          disabled={campaigns.creating}
        >
          {campaigns.creating ? "Creating..." : "Create Campaign"}
        </button>
      </div>
    {/if}
  </form>
</div>
