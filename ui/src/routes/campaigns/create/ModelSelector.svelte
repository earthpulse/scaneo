<script>
  import models from "$stores/models.svelte.js";
  import DeleteOutline from "svelte-material-icons/DeleteOutline.svelte";

  let {
    labels,
    labelMappings = $bindable({}),
    onclick = () => {},
    ondelete = () => {},
  } = $props();

  let selectedModel = $state("");
  let selectedModels = $state([]);

  $effect(() => {
    models.retrieve();
  });

  $effect(() => {
    if (Object.keys(labelMappings).length > 0) {
      selectedModels =
        models.data?.filter((model) => labelMappings[model.id]) || [];
    }
  });

  $effect(() => {
    if (selectedModel) {
      console.log(selectedModel);
      if (selectedModels.find((m) => m.id === selectedModel)) return;
      selectedModels.push(models.data.find((m) => m.id === selectedModel));
      labelMappings[selectedModel] = labels.reduce((acc, label) => {
        acc[label.name] = 0;
        return acc;
      }, {});
      selectedModel = "";
      labelMappings = { ...labelMappings };
    }
  });

  const deleteModel = (model) => {
    selectedModels = selectedModels.filter((m) => m.id !== model.id);
    delete labelMappings[model.id];
    labelMappings = { ...labelMappings };
    ondelete();
  };
</script>

{#if models.data?.length > 0}
  <div class="form-control">
    <label class="label font-medium mb-1">Select Models (optional)</label>
    <select class="select select-bordered w-full" bind:value={selectedModel}>
      <option value="" disabled selected>Choose a model</option>
      {#each models.data as model}
        <option value={model.id}>{model.name} (task: {model.task})</option>
      {/each}
    </select>
    {#if selectedModels.length > 0}
      <ul class="mt-2 flex flex-col gap-2">
        {#each selectedModels as model}
          <li
            class="flex flex-col items-left gap-2 p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center gap-2">
              <button
                class="btn btn-ghost btn-xs"
                onclick={() => deleteModel(model)}
              >
                <DeleteOutline size="15" />
              </button>
              <span class="font-medium">{model.name}</span>
            </div>
            {#if labels}
              <div class="border-t border-gray-200 pt-3 mt-2 flex flex-col">
                <p class="text-sm italic text-gray-600 mb-2">Label mapper</p>
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Model Output Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each labels as label}
                      <tr>
                        <td class="flex flex-row gap-2 items-center">
                          <!-- <button
                            class="btn btn-ghost btn-xs"
                            onclick={() => deleteLabel(model.id, label.name)}
                          >
                            <DeleteOutline size="15" />
                          </button> -->
                          <div
                            class="w-4 h-4 rounded"
                            style:background-color={label.color}
                          ></div>
                          {label.name}
                        </td>
                        <td>
                          <input
                            type="number"
                            class="input input-bordered input-sm w-20"
                            min="0"
                            bind:value={labelMappings[model.id][label.name]}
                          />
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
                {#if onclick}
                  <button class="btn btn-primary self-end w-[100px]" {onclick}
                    >Save</button
                  >
                {/if}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
