<script>
  import models from "$stores/models.svelte.js";

  $effect(() => {
    models.retrieve();
  });
</script>

<div class="p-3">
  {#if models.loading}
    <p>Loading...</p>
  {:else if models.error}
    <p>Error: {models.error}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Create Model</h2>
          <p>Create a new model</p>
          <a class="btn btn-primary" href="/models/create">Create</a>
        </div>
      </div>
      {#each models.data as model}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{model.name}</h2>
            <p>{model.description}</p>
            <div
              class="card-actions flex flex-row justify-between items-center"
            >
              <div>
                <a class="btn" href="/models/{model.id}">Manage</a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
