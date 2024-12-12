<script>
  import TaskSelector from "./TaskSelector.svelte";
  import ModelSelector from "./ModelSelector.svelte";
  import Settings from "./Settings.svelte";
  import ExportBtn from "$components/ExportBtn.svelte";
  import baseUrl from "$stores/baseUrl.svelte.js";
  import { page } from "$app/stores";
</script>

<nav
  class="flex flex-row gap-2 bg-bg2 p-3 border-b border-t border-border justify-between"
>
  <span class="flex flex-row gap-2">
    <TaskSelector />
    <ModelSelector />
    <ExportBtn
      link={`${baseUrl.url}/campaigns/export?id=${$page.url.searchParams.get("id")}`}
    />
  </span>
  <span class="flex flex-row gap-2">
    <Settings />
  </span>
</nav>
