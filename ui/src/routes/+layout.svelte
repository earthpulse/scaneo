<script>
	import '$styles/app.css';
	import Nav from './Nav.svelte';

	const {children} = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Nav/>
	<main class="flex flex-col flex-1">
		{@render children()}
	</main>
</div>
