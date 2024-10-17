<script>
  import campaigns from "$stores/campaigns.svelte.js";
  import { goto } from "$app/navigation";

  let name = $state("");
  let description = $state("");
  let localPath = $state("");
  let storageOption = $state(0);

  const createCampaign = async (e) => {
    e.preventDefault();
    console.log("localPath", localPath);
    if (name !== "" && description !== "") {
      try {
        const data = await campaigns.create(name, description, localPath);
        goto(`/campaigns/${data.id}`);
      } catch (error) {
        alert(error);
      }
    }
  };

  const selectLocalFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      console.log("dirHandle", dirHandle);
      localPath = dirHandle.name;
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  };
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
      <button class="btn" type="button" onclick={() => (storageOption = 0)}
        >Local</button
      >
      <button class="btn" type="button" onclick={() => (storageOption = 1)}
        >Cloud (S3)</button
      >
      <button class="btn" type="button" onclick={() => (storageOption = 2)}
        >EOTDL</button
      >
    </span>
    {#if storageOption == 0}
      <input
        type="text"
        class="input input-bordered"
        placeholder="Folder path"
        bind:value={localPath}
      />
    {:else if storageOption == 1}
      <input type="text" class="input input-bordered" placeholder="url" />
      <input type="text" class="input input-bordered" placeholder="bucket" />
      <input type="text" class="input input-bordered" placeholder="region" />
      <input
        type="text"
        class="input input-bordered"
        placeholder="access key"
      />
      <input
        type="text"
        class="input input-bordered"
        placeholder="secret key"
      />
    {:else}
      <p>select dataset from eotdl (if plugin is installed)</p>
    {/if}
    <button class="btn btn-primary" type="submit">Create</button>
  </form>
</div>
