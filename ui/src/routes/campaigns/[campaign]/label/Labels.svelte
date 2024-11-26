<script>
  import { onDestroy } from "svelte";
  import labels from "$stores/labels.svelte.js";
  import { page } from "$app/stores";
  import "$styles/color_input.css";

  $effect(async () => {
    labels.retrieve($page.params.campaign);
  });
  let color = $state("#000000");
  let newLabel = $state("");
  let disabled = $state(false);
  let lineOpacity = $state("0F"); // hexadecimal value

  const createLabel = async (e) => {
    e.preventDefault();
    disabled = true;
    if (newLabel) {
      try {
        await labels.create(newLabel, color, $page.params.campaign);
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

  onDestroy(() => {
    labels.reset();
  });
</script>

<section>
  <h1>Labels</h1>
  <form class="flex" onsubmit={createLabel}>
    <input
      type="text"
      bind:value={newLabel}
      placeholder="new label"
      required
      class="rounded-r-none input"
    />
    <button
      type="submit"
      class="h-auto rounded-none btn btn-primary"
      {disabled}
    >
      Create
    </button>
    <div
      class="box-border w-24 flex border-[1px] border-slate-400 rounded-tr-lg rounded-br-lg"
    >
      <input
        bind:value={color}
        class="box-border h-auto p-0 m-0 rounded-tr-lg rounded-br-lg"
        type="color"
        name=""
        id=""
      />
    </div>
  </form>
  <div>
    {#if labels.data.length == 0}
      <p class="italic">No labels found</p>
    {:else}
      <div class="flex flex-col items-start">
        {#each labels.data as label}
          <span
            style="background-color: {label.color
              ? label.color
              : ''}{lineOpacity};
                  
            "
            class="w-full my-1 hover:text-blue-900 hover:font-semibold flex justify-between rounded-md {labels.current ==
            label.name
              ? 'text-blue-900 font-semibold'
              : ''}"
          >
            <div
              style="background-color: {label.color ? label.color : ''};"
              class="w-12 h-auto rounded-l-md"
            ></div>
            <button onclick={() => (labels.current = label.name)} class="w-full"
              >{label.name}</button
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
