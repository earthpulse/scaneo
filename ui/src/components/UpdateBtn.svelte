<script>
  let { onclick } = $props();
</script>

<button
  class="btn btn-outline btn-sm tooltip flex items-center p-2"
  {onclick}
  data-tip="Update"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0l2.586 2.586a2 2 0 010 2.828l-8.083 8.083"
    />
  </svg>
</button>
