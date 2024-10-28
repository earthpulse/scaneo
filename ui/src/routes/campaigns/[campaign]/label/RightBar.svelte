<script>
  import FileExplorer from "$components/FileExplorer.svelte";
</script>

<div
  class="flex flex-col justify-between gap-2 p-3 border-l bg-bg2 border-border"
>
  <div>
    <h2>images</h2>
    <div class="w-60">
      <FileExplorer/>
    </div>
  </div>
  <section>labels</section>
  <section>settings</section>
</div>
