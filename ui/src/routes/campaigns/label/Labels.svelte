<script>
  import labels from "$stores/labels.svelte.js";
  import { page } from "$app/stores";
  import Plus from "svelte-material-icons/Plus.svelte";
  import DeleteOutline from "svelte-material-icons/DeleteOutline.svelte";
  import "$styles/color_input.css";

  $effect(async () => {
    labels.retrieve($page.url.searchParams.get("id"));
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
        await labels.create(newLabel, color, $page.url.searchParams.get("id"));
        newLabel = "";
      } catch (e) {
        alert(e.message);
      }
      disabled = false;
    }
  };

  const selectLabel = async (LabelName) => {
    labels.current = LabelName;
  };

  const deleteLabel = async (id) => {
    confirm(
      "Are you sure you want to delete this label? This action is irreversible and will delete all the associated annotations."
    ) && labels.delete(id);
  };
</script>

<section class="flex flex-col flex-1 h-full gap-2 mt-2">
  <form class="flex" onsubmit={createLabel}>
    <input
      type="text"
      bind:value={newLabel}
      placeholder="new label"
      required
      class="rounded-r-none input input-sm border border-1"
    />
    <button
      type="submit"
      class="rounded-none btn btn-primary btn-sm"
      {disabled}
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
  </form>
  <div class="flex flex-col flex-1 h-full">
    {#if labels.data.length == 0}
      <p class="italic">No labels found</p>
    {:else}
      <div class="flex flex-col flex-1 h-full overflow-auto">
        <table class="w-full">
          {#each labels.data as label}
            <tr
              class="h-8 hover:bg-slate-100 {labels.current == label.name
                ? 'bg-slate-50'
                : ''}"
            >
              <td class="w-8">
                <div
                  style="background-color: {label.color};"
                  class="w-4 h-4 ml-2 rounded-full"
                ></div>
              </td>
              <td>
                <button
                  onclick={() => selectLabel(label.name)}
                  class="w-full px-2 text-left"
                >
                  {label.name}
                </button>
              </td>
              <td class="w-8">
                <button
                  class="px-2 hover:text-red-600"
                  onclick={() => deleteLabel(label.id)}
                >
                  <DeleteOutline size="15" />
                </button>
              </td>
            </tr>
          {/each}
        </table>
      </div>
    {/if}
  </div>
</section>
