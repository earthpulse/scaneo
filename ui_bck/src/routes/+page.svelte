<script>
	import { browser } from '$app/environment';
	import LoadBlockingOverlay from '$components/LoadBlockingOverlay.svelte';
	import MapContainer from '$components/Map/MapContainer.svelte';
	import SidePannel from '$components/Map/SidePannel.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<main class="min-w-full relative min-h-full">
	<LoadBlockingOverlay />
	{#if browser}
		<SidePannel />
		<MapContainer />
	{/if}
</main>
