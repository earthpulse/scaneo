<script>
  import Plus from "svelte-material-icons/Plus.svelte";
  import DeleteOutline from "svelte-material-icons/DeleteOutline.svelte";
  let { labels = $bindable([]) } = $props();

  let color = $state("#000000");
  let newLabel = $state("");
  let disabled = $state(false);

  const createLabel = async (e) => {
    e.preventDefault();
    if (newLabel == "" || labels.map((l) => l.name).includes(newLabel)) return;
    labels.push({ name: newLabel, color: color });
  };
</script>

<div class="form-control">
  <label class="label font-medium">Create labels (optional)</label>
  <p class="text-xs text-gray-600 italic mb-2">
    You can create labels later in the labelling interface. However, you will
    need to create labels in order to use a Model for assisted labelling (which
    can as well be defined later).
  </p>
  <div class="flex">
    <input
      type="text"
      bind:value={newLabel}
      placeholder="new label"
      class="rounded-r-none input input-sm border border-1 border-gray-300"
    />
    <button
      type="submit"
      class="rounded-none btn btn-primary btn-sm"
      {disabled}
      onclick={createLabel}
    >
      <Plus size="15" />
    </button>
    <div class="box-border flex w-24 rounded-tr-lg rounded-br-lg">
      <input
        bind:value={color}
        class="box-border h-full p-0 m-0 rounded-tr-lg rounded-br-lg"
        type="color"
      />
    </div>
  </div>
  {#if labels.length > 0}
    <ul class="mt-2">
      {#each labels as label}
        <li class="flex items-center gap-2">
          <button
            class="btn btn-ghost btn-xs"
            onclick={() =>
              (labels = labels.filter((l) => l.name !== label.name))}
          >
            <DeleteOutline size="15" />
          </button>
          <div
            class="w-4 h-4 rounded"
            style:background-color={label.color}
          ></div>
          {label.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>
