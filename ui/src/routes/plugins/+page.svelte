<script>
  import plugins from "$stores/plugins.svelte.js";

  let disabled = $state(false);
  let selected = $state(null);

  const enablePlugin = async (name) => {
    disabled = true;
    selected = name;
    try {
      await plugins.enable(name);
    } catch (e) {
      alert(e.message);
    }
    disabled = false;
    selected = null;
  };

  const disablePlugin = async (name) => {
    disabled = true;
    selected = name;
    try {
      await plugins.disable(name);
    } catch (e) {
      alert(e.message);
    }
    disabled = false;
    selected = null;
  };
</script>

<div class="p-6">
  {#if plugins.loading}
    <div>loading...</div>
  {:else if plugins.error}
    <div>{plugins.error}</div>
  {:else}
    <h1 class="text-3xl font-bold mb-8">Plugins</h1>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each plugins.data as plugin}
        <div class="card bg-base-100 shadow-xl border border-1">
          <div class="card-body">
            <h2 class="card-title">{plugin.name}</h2>
            <p class="text-sm opacity-70">
              Status: <span
                class={plugin.enabled ? "text-success" : "text-warning"}
              >
                {plugin.enabled ? "enabled" : "disabled"}
              </span>
            </p>
            <div class="card-actions justify-end mt-4">
              {#if !plugin.enabled}
                <button
                  {disabled}
                  class="btn btn-primary {plugin.name == selected
                    ? 'btn-disabled'
                    : ''}"
                  onclick={() => enablePlugin(plugin.name)}
                >
                  {#if disabled && plugin.name == selected}
                    <span class="loading loading-spinner"></span>
                  {/if}
                  {disabled && plugin.name == selected
                    ? "enabling..."
                    : "Enable"}
                </button>
              {:else}
                <button
                  {disabled}
                  class="btn btn-error {plugin.name == selected
                    ? 'btn-disabled'
                    : ''}"
                  onclick={() => disablePlugin(plugin.name)}
                >
                  {#if disabled && plugin.name == selected}
                    <span class="loading loading-spinner"></span>
                  {/if}
                  {disabled && plugin.name == selected
                    ? "disabling..."
                    : "Disable"}
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
