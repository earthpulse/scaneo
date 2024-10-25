<script>
  import labels from "$stores/labels.svelte.js";
  import { page } from "$app/stores";

  $effect(() => {
    labels.retrieve($page.params.campaign);
  });

  let newLabel = $state("");
  let disabled = $state(false);

  const createLabel = async (e) => {
    e.preventDefault();
    disabled = true;
    if (newLabel) {
      try {
        await labels.create(newLabel, $page.params.campaign);
        newLabel = "";
      } catch (e) {
        alert(e.message);
      }
      disabled = false;
    }
  };

  const deleteLabel = async (id) => {
    labels.delete(id);
  };
</script>

<section>
  <h1>Labels</h1>
  <form onsubmit={createLabel}>
    <input
      type="text"
      bind:value={newLabel}
      placeholder="new label"
      required
      class="input"
    />
    <button type="submit" class="btn btn-primary" {disabled}> Create </button>
  </form>
  <div>
    {#if labels.data.length == 0}
      <p class="italic">No labels found</p>
    {:else}
      <div class="flex flex-col items-start">
        {#each labels.data as label}
          <span
            class="w-full flex justify-between {labels.current == label.id
              ? 'bg-slate-300'
              : ''}"
          >
            <button
              onclick={() => (labels.current = label.id)}
              class="hover:bg-slate-300 w-full">{label.name}</button
            >
            <button class="btn btn-error" onclick={() => deleteLabel(label.id)}
              >Delete</button
            ></span
          >
        {/each}
      </div>
    {/if}
  </div>
</section>
