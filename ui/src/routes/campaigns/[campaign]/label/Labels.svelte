<script>
  import labels from "$stores/labels.svelte.js";
  import { page } from "$app/stores";
  import Plus from "svelte-material-icons/Plus.svelte";
  import DeleteOutline from "svelte-material-icons/DeleteOutline.svelte";
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
    confirm(
      "Are you sure you want to delete this label? This action is irreversible and will delete all the associated annotations."
    ) && labels.delete(id);
  };
</script>

<section class="mt-2 flex flex-col gap-2 flex-1 h-full">
  <form class="flex" onsubmit={createLabel}>
    <input
      type="text"
      bind:value={newLabel}
      placeholder="new label"
      required
      class="rounded-r-none input input-sm"
    />
    <button
      type="submit"
      class="rounded-none btn btn-primary btn-sm"
      {disabled}
    >
      <Plus size="15" />
    </button>
    <div class="box-border w-24 flex rounded-tr-lg rounded-br-lg">
      <input
        bind:value={color}
        class="box-border h-full p-0 m-0 rounded-tr-lg rounded-br-lg"
        type="color"
      />
    </div>
  </form>
  <div class="flex-1 h-full flex flex-col">
    {#if labels.data.length == 0}
      <p class="italic">No labels found</p>
    {:else}
      <div class="flex-1 h-full flex flex-col overflow-auto">
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
                  class="w-4 h-4 rounded-full ml-2"
                ></div>
              </td>
              <td>
                <button
                  onclick={() => (labels.current = label.name)}
                  class="w-full text-left px-2"
                >
                  {label.name}
                </button>
              </td>
              <td class="w-8">
                <button
                  class="hover:text-red-600 px-2"
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
