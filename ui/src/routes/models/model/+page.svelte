<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import models from "$stores/models.svelte.js";
  import DeleteBtn from "$components/DeleteBtn.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";

  $effect(() => {
    models.retrieveOne($page.url.searchParams.get("id"));
  });

  const deleteModel = () => {
    if (confirm("Are you sure you want to delete this model?")) {
      models.delete($page.url.searchParams.get("id"));
      goto(`${baseUrl.url}/models`);
    }
  };
</script>

<div class="container mx-auto p-6">
  <!-- Header section with campaign name and actions -->
  <div class="mb-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">
        {models.current?.name || "Loading model..."}
      </h1>

      <div class="flex flex-row gap-3">
        <DeleteBtn onclick={deleteModel} />
      </div>
    </div>

    {#if models.current?.description}
      <p class="mt-2 text-gray-600">
        {models.current.description}
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
            <span class="text-gray-700">{models.current?.name || "-"}</span>
          </div>
          <div class="flex">
            <span class="font-medium w-32">Description:</span>
            <span class="text-gray-700"
              >{models.current?.description || "No description provided"}</span
            >
          </div>
          <div class="flex">
            <span class="font-medium w-32">URL:</span>
            <a
              class="text-pink-400 hover:underline"
              href={models.current?.url}
              target="_blank">{models.current?.url || "No URL provided"}</a
            >
          </div>
          <div class="flex">
            <span class="font-medium w-32">Task:</span>
            <span class="text-gray-700"
              >{models.current?.task || "No task provided"}</span
            >
          </div>
          <div class="flex">
            <span class="font-medium w-32">Preprocessing:</span>
            <span class="text-gray-700"
              >{models.current?.preprocessing.join(", ") || "-"}</span
            >
          </div>
          <div class="flex">
            <span class="font-medium w-32">Postprocessing:</span>
            <span class="text-gray-700"
              >{models.current?.postprocessing.join(", ") || "-"}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
