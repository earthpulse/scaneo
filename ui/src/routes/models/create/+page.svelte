<script>
  import models from "$stores/models.svelte.js";
  import { goto } from "$app/navigation";

  let name = $state("");
  let description = $state("");
  let url = $state("");
  let task = $state("segmentation");

  const createModel = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      try {
        const data = await models.create(name, description, url, task);
        goto(`/models/${data.id}`);
      } catch (error) {
        alert(error);
      }
    }
  };
</script>

<div class="max-w-2xl mx-auto p-6 w-full">
  <h1 class="text-3xl font-bold mb-6">Create a new model</h1>
  <form class="flex flex-col gap-4" onsubmit={createModel}>
    <div class="form-control">
      <label for="model-name" class="label font-medium mb-1">Model Name</label>
      <input
        id="model-name"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={name}
        placeholder="Enter model name"
      />
    </div>

    <div class="form-control">
      <label for="model-description" class="label font-medium mb-1"
        >Model Description</label
      >
      <input
        id="model-description"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={description}
        placeholder="Enter model description"
      />
    </div>

    <div class="form-control">
      <label for="model-url" class="label font-medium mb-1">Model URL</label>
      <input
        id="model-url"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={url}
        placeholder="Enter model URL"
      />
    </div>

    <div class="form-control">
      <label class="label font-medium mb-1">Task</label>
      <div class="flex gap-4">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="classification"
            bind:group={task}
          />
          <span class="ml-2">Classification</span>
        </label>
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="detection"
            bind:group={task}
          />
          <span class="ml-2">Detection</span>
        </label>
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="segmentation"
            bind:group={task}
          />
          <span class="ml-2">Segmentation</span>
        </label>
      </div>
    </div>

    <button
      class="btn btn-primary mt-4 w-full md:w-auto md:self-end"
      type="submit"
    >
      Create Model
    </button>
  </form>
</div>
