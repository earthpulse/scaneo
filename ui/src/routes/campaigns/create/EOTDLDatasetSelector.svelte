<script>
  let { eotdlDatasetId = $bindable("") } = $props();

  let datasets = $state([]);
  let loading = $state(false);
  let searchTerm = $state("");
  let filteredDatasets = $derived(
    datasets.filter((dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  $effect(async () => {
    loading = true;
    const res = await fetch("https://api.eotdl.com/datasets");
    if (!res.ok) return alert("Failed to fetch EOTDL datasets");
    datasets = await res.json();
    loading = false;
  });
</script>

<!-- <div class="alert">
  <p>Select dataset from EOTDL (if plugin is installed)</p>
</div> -->

{#if loading}
  <div class="alert">
    <p>Loading datasets...</p>
  </div>
{:else if datasets.length == 0}
  <div class="alert">
    <p>No datasets found</p>
  </div>
{:else}
  <div class="form-control">
    <label class="label font-medium mb-1">Search EOTDL Dataset</label>
    <input
      type="text"
      class="input input-bordered w-full mb-2"
      placeholder="Search datasets..."
      bind:value={searchTerm}
    />

    <label class="label font-medium mb-1">Select EOTDL Dataset</label>
    <select class="select select-bordered w-full" bind:value={eotdlDatasetId}>
      {#each filteredDatasets as dataset}
        <option value={dataset.id}>{dataset.name}</option>
      {/each}
    </select>
  </div>
{/if}
