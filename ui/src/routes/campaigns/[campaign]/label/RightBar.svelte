<script>
  import images from "$stores/images.svelte.js";
</script>

<div
  class="z-20 flex flex-col justify-between gap-2 p-3 border-l bg-bg2 border-border"
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
