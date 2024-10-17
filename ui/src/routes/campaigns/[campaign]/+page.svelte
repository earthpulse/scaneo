<script>
  import { page } from "$app/stores";
</script>

manage campaign

<div class="flex flex-row gap-3">
  <button class="btn btn-primary">Update sources (manually)</button>
  <button class="btn btn-primary">Delete</button>
  <a href="/campaigns/{$page.params.campaign}/label" class="btn btn-primary"
    >Label</a
  >
  <a href="/campaigns/{$page.params.campaign}/export" class="btn btn-primary"
    >Export</a
  >
</div>
