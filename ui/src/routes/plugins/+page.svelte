<script>
  import plugins from "$stores/plugins.svelte.js";

  let disabled = $state(false);
  let selected = $state(null);

  const installPlugin = async (name) => {
    disabled = true;
    selected = name;
    try {
      await plugins.install(name);
    } catch (e) {
      alert(e.message);
    }
    disabled = false;
    selected = null;
  };

  const uninstallPlugin = async (name) => {
    disabled = true;
    selected = name;
    try {
      await plugins.uninstall(name);
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
      <p>status: {plugin.status}</p>
      {#if plugin.status == "uninstalled"}
        <button
          {disabled}
          class="btn btn-primary {plugin.name == selected
            ? 'btn-disabled'
            : ''}"
          onclick={() => installPlugin(plugin.name)}
        >
          {#if disabled && plugin.name == selected}
            <span class="loading loading-spinner"></span>
          {/if}
          {disabled && plugin.name == selected
            ? "installing..."
            : "install"}</button
        >
      {:else if plugin.status == "installed"}
        <button
          {disabled}
          class="btn btn-primary {plugin.name == selected ? 'btn-primary' : ''}"
          onclick={() => installPlugin(plugin.name)}
        >
          {#if disabled && plugin.name == selected}
            <span class="loading loading-spinner"></span>
          {/if}
          {disabled && plugin.name == selected
            ? "enabling..."
            : "enable"}</button
        >
      {:else if plugin.status == "enabled"}
        <button
          class="btn btn-error"
          onclick={() => uninstallPlugin(plugin.name)}
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
