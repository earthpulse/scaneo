<script>
  import TaskSelector from "./TaskSelector.svelte";
  import ModelSelector from "./ModelSelector.svelte";
  import Settings from "./Settings.svelte";
</script>

<nav
  class="flex flex-row gap-2 bg-bg2 p-3 border-b border-t border-border justify-between"
>
  <span class="flex flex-row gap-2">
    <TaskSelector />
    <ModelSelector />
  </span>
  <Settings />
</nav>
