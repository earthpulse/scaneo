<script>
  import campaigns from "$stores/campaigns.svelte.js";
  import { goto } from "$app/navigation";
  import plugins from "$stores/plugins.svelte.js";

  let name = $state("");
  let description = $state("");
  let localPath = $state("");
  let storageOption = $state(0);

  const createCampaign = async (e) => {
    e.preventDefault();
    console.log("localPath", localPath);
    if (name !== "" && description !== "") {
      if (storageOption == 2) return alert("EOTDL not implemented yet");
      try {
        const data = await campaigns.create(name, description, localPath);
        goto(`/campaigns/${data.id}`);
      } catch (error) {
        alert(error);
      }
    }
  };

  $inspect(plugins.data.find((p) => p.name == "eotdl")?.status);
</script>

<div class="p-3">
  <h1>Create a new labelling campaign</h1>
  <form class="flex flex-col gap-3" onsubmit={createCampaign}>
    <label for="campaign-name">Campaign Name</label>
    <input
      id="campaign-name"
      required
      type="text"
      class="input input-bordered"
      bind:value={name}
      placeholder="Enter campaign name"
    />
    <label for="campaign-description">Campaign Description</label>
    <input
      id="campaign-description"
      required
      type="text"
      class="input input-bordered"
      bind:value={description}
      placeholder="Enter campaign description"
    />
    <label for="campaign-storage">Select storage</label>
    <span>
      <button
        class="btn"
        class:btn-primary={storageOption === 0}
        type="button"
        onclick={() => (storageOption = 0)}>Local</button
      >
      <button
        class="btn"
        class:btn-primary={storageOption === 1}
        type="button"
        onclick={() => (storageOption = 1)}>Cloud (S3)</button
      >
      {#if plugins.data.find((p) => p.name == "eotdl")?.status == "enabled"}
        <button
          class="btn"
          class:btn-primary={storageOption === 2}
          type="button"
          onclick={() => (storageOption = 2)}>EOTDL</button
        >
      {/if}
    </span>
    {#if storageOption == 0}
      <input
        type="text"
        class="input input-bordered"
        placeholder="Folder path"
        required
        bind:value={localPath}
      />
    {:else if storageOption == 1}
      <input
        type="text"
        class="input input-bordered"
        placeholder="url"
        required
      />
      <input
        type="text"
        class="input input-bordered"
        placeholder="bucket"
        required
      />
      <input
        type="text"
        class="input input-bordered"
        placeholder="region"
        required
      />
      <input
        type="text"
        class="input input-bordered"
        placeholder="access key"
        required
      />
      <input
        type="text"
        class="input input-bordered"
        placeholder="secret key"
        required
      />
    {:else}
      <p>select dataset from eotdl (if plugin is installed)</p>
    {/if}
    <button class="btn btn-primary" type="submit">Create</button>
  </form>
</div>
