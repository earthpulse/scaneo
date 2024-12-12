<script>
  import baseUrl from "$stores/baseUrl.svelte.js";
</script>

<nav class="flex flex-row justify-between bg-bg1 p-3">
  <a
    href={baseUrl.url}
    class="text-lg font-bold hover:bg-bg2 px-2 py-1 rounded transition duration-300"
    >SCANEO</a
  >
  <div class="flex flex-row gap-6">
    <a
      href="{baseUrl.url}/campaigns"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300"
      >Campaigns</a
    >
    <a
      href="{baseUrl.url}/models"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300">Models</a
    >
    <a
      href="{baseUrl.url}/plugins"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300">Plugins</a
    >
  </div>
  <div class="flex flex-row gap-3">
    <!-- <a
      href="/docs"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300">Docs</a
    > -->
    <a
      href="https://github.com/earthpulse/scaneo"
      target="_blank"
      class="hover:bg-bg2 px-2 py-1 rounded transition duration-300">Github</a
    >
  </div>
</nav>
