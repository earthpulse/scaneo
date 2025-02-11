<script>
	import { setContext } from "svelte";
	import { mapStore } from '$stores/map/map.svelte.js'

	let { position, zoom, panes, children } = $props();

	let map = $state(null);
	let options = {
		attributionControl: false,
		max_zoom: 20,
	};
	
	$effect(async () => {
		const L = await import("leaflet");
		await import("leaflet/dist/leaflet.css");
		map = L.map("map", options).setView(position, zoom);
		map.zoomControl.setPosition('bottomright');
		panes?.forEach(({ name, zIndex }) => {
			map.createPane(name);
			map.getPane(name).style.zIndex = zIndex;
			map.getPane(name).style.pointerEvents = "none";
		});
		mapStore.map = map
		return () => map.remove();
	});

	setContext("map", {
		getMap: () => map,
	});
</script>

<div id="map">
	{@render children()}
</div>

<style>
	#map {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 0;
	}
</style>
