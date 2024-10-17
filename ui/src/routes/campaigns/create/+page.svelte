<script>
  import campaigns from "$stores/campaigns.svelte.js";

  let name = $state("");
  let description = $state("");

  const createCampaign = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      try {
        campaigns.create(name, description);
      } catch (error) {
        alert(error);
      }
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
    <label for="campaign-storage">Select storage (pop up with options)</label>
    <div>
      <a class="btn btn-secondary">local (select folder)</a>
      <a class="btn btn-secondary">Cloud S3 (enter credentials)</a>
      <a class="btn btn-secondary">EOTDL (only if plugin)</a>
    </div>
    <button class="btn btn-primary" type="submit">Create</button>
  </form>
</div>
