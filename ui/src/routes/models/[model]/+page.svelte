<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import models from "$stores/models.svelte.js";

  $effect(() => {
    models.retrieveOne($page.params.model);
  });

  const deleteModel = () => {
    if (confirm("Are you sure you want to delete this model?")) {
      models.delete($page.params.model);
      goto("/models");
    }
  };
</script>

<p>Name: {models.current?.name}</p>
<p>Description: {models.current?.description}</p>
<p>URL: {models.current?.url}</p>

<div class="flex flex-row gap-3">
  <button class="btn btn-primary" onclick={deleteModel}>Delete</button>
</div>
