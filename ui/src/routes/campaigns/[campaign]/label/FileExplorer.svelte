<script>
  import { browser } from "$app/environment";
  import images from "$stores/images.svelte.js";
  import { onDestroy } from "svelte";

  // $: console.log(dataset, version);

  let currentLevel = $state({});
  let navigationStack = $state([]);
  let loading = $state(false);
  let currentPath = $state([]);
  let onDetails = $state(false);
  let details = $state({});
  let filter_string = $state(null);
  const load = async () => {
    loading = true;
    currentLevel = {};
    navigationStack = [];
    let tree = buildFileTree();
    currentLevel = tree;
    loading = false;
  };

  $effect(async () => {
    if (browser) load();
  });

  onDestroy(() => {
    images.reset();
  });

  const buildFileTree = () => {
    const tree = {};
    images.data.forEach((file) => {
      const path = file.path.split(file.path.includes("\\") ? "\\" : "/");
      let current = tree;
      path.forEach((folder, i) => {
        if (i == path.length - 1) {
          current[folder] = file;
        } else {
          if (!current[folder]) current[folder] = {};
          current = current[folder];
        }
      });
    });
    return tree;
  };

  const openFolder = (folderName) => {
    navigationStack = [...navigationStack, currentLevel];
    currentLevel = currentLevel[folderName];
    getCurrentPath(folderName);
  };

  const goBack = () => {
    if (onDetails) {
      currentPath = currentPath.slice(0, currentPath.length - 1);
      onDetails = false;
    } else {
      currentLevel = navigationStack.pop();
      currentPath = currentPath.slice(0, currentPath.length - 1);
    }
  };

  const goToLevel = (folder) => {
    const folderIndex = currentPath.indexOf(folder) + 1;

    if (
      currentPath.length > navigationStack.length &&
      folder.split(".").length < 2
    ) {
      onDetails = false;
      currentPath = currentPath.slice(0, currentPath.length - 1);
    }
    for (let i = 0; navigationStack.length - folderIndex > 0; i++) {
      goBack();
    }
  };

  const goToDetails = (file) => {
    images.current = file;
  };

  const getCurrentPath = (intoFolder) => {
    if (navigationStack.length > 0) {
      currentPath = [...currentPath, intoFolder];
    } else {
      currentPath = [];
    }
  };

  let filtered_level = $derived(() => {
    if (filter_string) {
      return Object.keys(currentLevel).filter((item) => {
        return item.toLowerCase().includes(filter_string.toLowerCase());
      });
    } else {
      return Object.keys(currentLevel);
    }
  });
</script>

{#if !loading}
  {#if images.data}
    <p>Files ({images.data.length}) :</p>
    <div class="overflow-auto w-full max-h-[200px] border-2">
      <input
        type="text"
        bind:value={filter_string}
        placeholder="Search in folder ..."
        class="pl-4 mt-1 ml-2 rounded-md"
      />
      <div class="pl-2 pb-2 h-fit text-[13px] font-semibold flex">
        <p>Path:/</p>
        {#each currentPath as folder}
          <button
            onclick={() => goToLevel(folder)}
            class="text-nowrap hover:underline"
          >
            {folder}/</button
          >
        {/each}
      </div>
      {#if navigationStack.length > 0 || onDetails}
        <button
          class="flex ml-2 italic underline hover:underline"
          onclick={goBack}
        >
          Return
        </button>
      {/if}
      <table class="ml-2">
        <tbody>
          {#if onDetails == false}
            {#each filtered_level() as item}
              <!-- {#if $user}
                            <button on:click={() => download(file.name)}
                                ><Download color="gray" size={20} /></button
                                >
                                {/if} -->
              {#if typeof currentLevel[item] === "object" && !currentLevel[item].id}
                <tr>
                  <td>
                    <button
                      class="flex hover:underline"
                      onclick={() => openFolder(item)}>{item}</button
                    >
                  </td>
                </tr>
              {:else}
                <tr>
                  <td class="pr-1">
                    <button
                      onclick={() => goToDetails(currentLevel[item], item)}
                      ><p class="flex">{item}</p></button
                    >
                  </td>
                  <!-- <td class="px-1">
                                        <p>
                                                {currentLevel[item].checksum.substr(0, 8)}...
                                        </p>
                                    </td>
                                    <td class="px-1">
                                        <p>
                                                {currentLevel[item].version}
                                        </p>
                                    </td> -->
                </tr>
              {/if}
              <!-- <td>{formatFileSize(file.size)}</td> -->
              <!-- <td class="text-xs">{current_files[file].checksum}</td> -->
            {/each}
          {:else}
            {#each Object.keys(details) as detail}
              <tr>
                <th class="text-left">{detail}:</th>
                <td class="pl-1">{details[detail]}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  {:else}
    <p>No files found.</p>
  {/if}
{:else}
  <p>Loading files ...</p>
{/if}
