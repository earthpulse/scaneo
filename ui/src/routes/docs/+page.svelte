<script>
    import { onMount } from "svelte";

    onMount(() => {
        // This page will be replaced by static files during build
        // For now, just redirect to the static docs
        window.location.href = "/docs/";
    });
</script>

<div>
    <p>Redirecting to documentation...</p>
</div>
