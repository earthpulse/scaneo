<script>
  let { name, description, children } = $props();
</script>

<div
  class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-1"
>
  <div class="card-body">
    <div class="space-y-4">
      <div>
        <p class="text-sm font-medium text-base-content/70 italic">Name</p>
        <h2 class="card-title text-xl mt-1">{name}</h2>
      </div>
      <div>
        <p class="text-sm font-medium text-base-content/70 italic">
          Description
        </p>
        <p class="text-base-content/70 mt-1">{description}</p>
      </div>
    </div>
    {@render children()}
  </div>
</div>
