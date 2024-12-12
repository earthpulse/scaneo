<script>
  import models from "$stores/models.svelte.js";
  import CreateCard from "$components/CreateCard.svelte";
  import Loader from "$components/Loader.svelte";
  import ErrorMsg from "$components/ErrorMsg.svelte";
  import Card from "$components/Card.svelte";
  import ManageBnt from "$components/ManageBnt.svelte";
  import DeleteBtn from "$components/DeleteBtn.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";

  $effect(() => {
    models.retrieve();
  });

  const deleteModel = (model) => {
    if (confirm("Are you sure you want to delete this model?")) {
      models.delete(model);
    }
  };
</script>

<div class="p-6 max-w-7xl mx-auto w-full">
  {#if models.loading}
    <Loader />
  {:else if models.error}
    <ErrorMsg error={models.error} />
  {:else}
    <h1 class="text-3xl font-bold mb-8">Models</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateCard
        title="Create Model"
        description="Create a model to automatically label data"
        link={`${baseUrl.url}/models/create`}
      />
      {#each models.data as model}
        <Card name={model.name} description={model.description}>
          <div class="card-actions flex flex-row gap-2 mt-6 justify-end">
            <span class="flex flex-row gap-2"> </span>
            <DeleteBtn onclick={() => deleteModel(model.id)} />
            <ManageBnt link={`${baseUrl.url}/models/model?id=${model.id}`} />
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
