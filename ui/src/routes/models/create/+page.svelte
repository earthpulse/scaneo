<script>
  import models from "$stores/models.svelte.js";
  import { goto } from "$app/navigation";

  let name = $state("");
  let description = $state("");
  let url = $state("");

  const createModel = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      try {
        const data = await models.create(name, description, url);
        goto(`/models/${data.id}`);
      } catch (error) {
        alert(error);
      }
    }
  };
</script>

<div class="p-3">
  <h1>Create a new model</h1>
  <form class="flex flex-col gap-3" onsubmit={createModel}>
    <label for="model-name">Model Name</label>
    <input
      id="model-name"
      required
      type="text"
      class="input input-bordered"
      bind:value={name}
      placeholder="Enter model name"
    />
    <label for="model-description">Model Description</label>
    <input
      id="model-description"
      required
      type="text"
      class="input input-bordered"
      bind:value={description}
      placeholder="Enter model description"
    />
    <label for="model-url">Model URL</label>
    <input
      id="model-url"
      required
      type="text"
      class="input input-bordered"
      bind:value={url}
      placeholder="Enter model URL"
    />
    <button class="btn btn-primary" type="submit">Create</button>
  </form>
</div>
