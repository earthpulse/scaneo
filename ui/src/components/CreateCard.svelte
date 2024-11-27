<script>
  let { title, description, link } = $props();
</script>

<div
  class="card bg-primary text-primary-content hover:shadow-2xl transition-shadow duration-200"
>
  <div class="card-body">
    <h2 class="card-title text-2xl">{title}</h2>
    <p class="text-primary-content/80">
      {description}
    </p>
    <div class="card-actions justify-end mt-4">
      <a
        class="btn btn-sm tooltip flex items-center"
        href={link}
        data-tip="Create New"
        aria-label="Create New"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </a>
    </div>
  </div>
</div>
