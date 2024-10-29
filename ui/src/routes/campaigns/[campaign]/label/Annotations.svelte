<script>
  import images from "$stores/images.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  $effect(() => {
    if (images.current) {
      annotations.retrieve(images.current.id);
    }
  });
</script>

<section>
  <h1>Annotations</h1>
  {#if annotations.data.length == 0}
    <p>No annotations found</p>
  {:else}
    <div>
      {#each annotations.data as annotation}
        <span class="flex flex-row gap-2">
          <p>{annotation.value}</p>
          <p>{annotation.type}</p>
          <button
            onclick={() => annotations.delete(annotation.id)}
            class="btn btn-error">Delete</button
          >
        </span>
      {/each}
    </div>
  {/if}
</section>
