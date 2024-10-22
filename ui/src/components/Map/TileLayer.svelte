<script>
	import { getContext, onDestroy, onMount } from 'svelte';

	let {url, options} = $props();

	const { getMap } = getContext('map');

	let layer = null;

	onMount(() => {
		const map = getMap();
		layer = L.tileLayer(url, options).addTo(map);
	});

	onDestroy(() => {
		layer.remove();
	});
</script>
