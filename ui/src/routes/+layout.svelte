<script>
	import '$styles/app.css';
	import Nav from './Nav.svelte';
	import plugins from "$stores/plugins.svelte.js";

	const {children} = $props();

	$effect(() => {
		plugins.retrieve();
	});
</script>

<div class="min-h-screen flex flex-col">
	<Nav/>
	<main class="flex flex-col flex-1">
		{@render children()}
	</main>
</div>
