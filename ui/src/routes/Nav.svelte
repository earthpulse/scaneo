<script>
  import baseUrl from "$stores/baseUrl.svelte.js";
  import FolderOpenOutline from "svelte-material-icons/FolderOpenOutline.svelte";
  import RobotOutline from "svelte-material-icons/RobotOutline.svelte";
  import PuzzleOutline from "svelte-material-icons/PuzzleOutline.svelte";
  import BookOpenOutline from "svelte-material-icons/BookOpenOutline.svelte";
  import Github from "svelte-material-icons/Github.svelte";
</script>

<nav class="flex flex-row justify-between bg-bg1 p-3">
  <a
    href={baseUrl.url}
    class="text-lg font-bold hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
    >SCANEO</a
  >
  <div class="flex flex-row gap-6">
    <a
      href="{baseUrl.url}/campaigns"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
      ><FolderOpenOutline size="20" />Campaigns</a
    >
    <a
      href="{baseUrl.url}/models"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
      ><RobotOutline size="20" />Models</a
    >
    <a
      href="{baseUrl.url}/plugins"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
      ><PuzzleOutline size="20" />Plugins</a
    >
  </div>
  <div class="flex flex-row gap-3">
    <a
      href="/docs"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
      ><BookOpenOutline size="20" />Docs</a
    >
    <a
      href="https://github.com/earthpulse/scaneo"
      target="_blank"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300 flex items-center gap-2"
      ><Github size="20" />Github</a
    >
  </div>
</nav>
