<script>
  import campaigns from "$stores/campaigns.svelte.js";
  import plugins from "$stores/plugins.svelte.js";
  import S3StorageParams from "./S3StorageParams.svelte";

  let name = $state("");
  let description = $state("");
  let localPath = $state("");
  let storageOption = $state(0);

  const createCampaign = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      if (storageOption == 2) return alert("EOTDL not implemented yet");
      try {
        campaigns.create(name, description, localPath);
      } catch (error) {
        alert(error);
      }
    }
  };

  const cancel = () => {
    campaigns.cancel();
    creating = false;
  };

  $effect(() => {
    campaigns.reset();
  });
</script>

<div class="max-w-2xl mx-auto p-6 w-full">
  <h1 class="text-3xl font-bold mb-6">Create a new labelling campaign</h1>

  <form class="flex flex-col gap-4" onsubmit={createCampaign}>
    <div class="form-control">
      <label for="campaign-name" class="label font-medium mb-1"
        >Campaign Name</label
      >
      <input
        id="campaign-name"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={name}
        placeholder="Enter campaign name"
      />
    </div>

    <div class="form-control">
      <label for="campaign-description" class="label font-medium mb-1"
        >Campaign Description</label
      >
      <input
        id="campaign-description"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={description}
        placeholder="Enter campaign description"
      />
    </div>

    <div class="form-control">
      <label class="label font-medium mb-2">Select Storage</label>
      <div class="flex gap-2 flex-wrap">
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
        <label class="label font-medium mb-1">Local Folder Path</label>
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Enter folder path"
          required
          bind:value={localPath}
        />
      </div>
    {:else if storageOption == 1}
      <S3StorageParams />
    {:else}
      <div class="alert">
        <p>Select dataset from EOTDL (if plugin is installed)</p>
      </div>
    {/if}

    {#if campaigns.completed}
      <div class="alert flex flex-row justify-between">
        <p>Campaign created successfully !</p>
        <a
          href={`/campaigns/${campaigns.data[0]?.id}/label`}
          class="btn btn-primary">Label</a
        >
      </div>
    {:else if campaigns.creating}
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span class="text-sm">{campaigns.message}</span>
          <button type="button" class="btn btn-sm btn-error" onclick={cancel}>
            Cancel
          </button>
        </div>
        <progress
          class="progress progress-primary w-full"
          value={isNaN(campaigns.progress) ? 0 : campaigns.progress * 100}
          max="100"
        ></progress>
      </div>
    {:else}
      <button
        class="btn btn-primary mt-4 w-full md:w-auto md:self-end"
        type="submit"
        disabled={campaigns.creating}
      >
        {campaigns.creating ? "Creating..." : "Create Campaign"}
      </button>
    {/if}
  </form>
</div>
