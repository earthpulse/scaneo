<script>
  import images from "$stores/images.svelte.js";
  import { onDestroy } from "svelte";
  import FolderOpenOutline from "svelte-material-icons/FolderOpenOutline.svelte";
  import ImageOutline from "svelte-material-icons/ImageOutline.svelte";
  import { page } from "$app/stores";

  // $: console.log(dataset, version);

  let currentLevel = $state({});
  let navigationStack = $state([]);
  let loading = $state(false);
  let currentPath = $state([]);
  let onDetails = $state(false);
  let details = $state({});
  let filter_string = $state(null);

  $effect(async () => {
    images.retrieve($page.url.searchParams.get("id"));
  });

  $effect(async () => {
    loading = true;
    currentLevel = {};
    navigationStack = [];
    let tree = buildFileTree();
    currentLevel = tree;
    loading = false;
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
      if (navigationStack.length > 0) {
        currentLevel = navigationStack.pop();
        currentPath = currentPath.slice(0, currentPath.length - 1);
      }
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

<div class="flex flex-col gap-2 h-full overflow-hidden">
  {#if !loading}
    {#if images.data}
      <p>Images ({images.data.length}) :</p>
      <div class="overflow-auto flex-grow flex flex-col gap-2">
        <input
          type="text"
          bind:value={filter_string}
          placeholder="Search in folder ..."
          class="p-1 rounded-md input-sm w-full"
        />
        <div class="text-sm flex">
          <button
            onclick={() => goToLevel("")}
            class="text-nowrap hover:underline"
          >
            {"/"}</button
          >
          {#each currentPath as folder}
            <button
              onclick={() => goToLevel(folder)}
              class="text-nowrap hover:underline"
            >
              {folder}/</button
            >
          {/each}
        </div>
        <div class="overflow-auto flex-grow">
          <table class="w-full">
            <tbody>
              {#if onDetails == false}
                {#each filtered_level() as item}
                  {#if typeof currentLevel[item] === "object" && !currentLevel[item].id}
                    <tr class="hover:bg-slate-100">
                      <td>
                        <button
                          class="flex hover:underline items-center gap-1 w-full"
                          onclick={() => openFolder(item)}
                          ><FolderOpenOutline size="15" />{item}</button
                        >
                      </td>
                    </tr>
                  {:else}
                    <tr
                      class="hover:bg-slate-100 {images.current?.id ==
                      currentLevel[item]?.id
                        ? 'bg-slate-100'
                        : ''}"
                    >
                      <td class="pr-1">
                        <button
                          onclick={() => goToDetails(currentLevel[item])}
                          class="w-full"
                          ><p class="flex items-center gap-1 w-full">
                            <ImageOutline size="15" />{item}
                          </p></button
                        >
                      </td>
                    </tr>
                  {/if}
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
      </div>
    {:else}
      <p>No files found.</p>
    {/if}
  {:else}
    <p>Loading files ...</p>
  {/if}
</div>
