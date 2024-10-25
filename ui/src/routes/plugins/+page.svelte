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

<div class="p-3">
  {#if plugins.loading}
    <div>loading...</div>
  {:else if plugins.error}
    <div>{plugins.error}</div>
  {:else}
    <h1>Plugins</h1>
    {#each plugins.data as plugin}
      <p>{plugin.name}</p>
      <p>status: {plugin.enabled ? "enabled" : "disabled"}</p>
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
            : "enable"}</button
        >
      {:else}
        <button class="btn btn-error" onclick={() => disablePlugin(plugin.name)}
          >{#if disabled && plugin.name == selected}
            <span class="loading loading-spinner"></span>
          {/if}{disabled && plugin.name == selected
            ? "disabling..."
            : "Disable"}</button
        >
      {/if}
    {/each}
  {/if}
</div>
