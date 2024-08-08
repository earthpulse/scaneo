<script>
	import { onDestroy } from 'svelte';
	import { initializeLayerStore, removeLayerStore } from '$lib/actions/layers';
	import mapStore from '$stores/Map/MapStore';

	initializeLayerStore();

	onDestroy(() => {
		if ($mapStore) removeLayerStore();
	});
</script>
