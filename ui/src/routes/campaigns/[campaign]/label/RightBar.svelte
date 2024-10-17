<script>
  import images from "$stores/images.svelte.js";
</script>

<div
  class="flex flex-col gap-2 bg-bg2 border-l border-border p-3 justify-between"
>
  <div>
    <h2>images</h2>
    {#each images.data as image}
      <p>{image.path}</p>
    {/each}
  </div>
  <section>labels</section>
  <section>settings</section>
</div>
