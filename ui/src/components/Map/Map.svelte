<script>
	import { browser } from '$app/environment';
	import mapStore from '$stores/Map/MapStore';
	import { onDestroy, onMount, setContext } from 'svelte';

	export let options = {
		attributionControl: false,
		drawControls: true,
		max_zoom: 20
	};
	export let zoomPosition = 'bottomright';
	export let panes = [
		{ name: 'default', zIndex: 200 },
		{ name: 'sam', zIndex: 400 }
	];

	let zoom = 12;
	let position = [42.0407, 3.1];
	let leafletMap;

	onMount(async () => {
		if (browser && !leafletMap) {
			const L = await import('leaflet');

			// Serve Icon from static/ to fix malformed library path
			const { Icon } = L;
			Icon.Default.imagePath = './';

			await import('leaflet-draw/dist/leaflet.draw.js');
			await import('$lib/leaflet.activearea');

			// options.renderer = L.canvas();

			// Fix for rectangle tool
			window.type = true;
			leafletMap = L.map('map', options).setActiveArea('map-viewport').setView(position, zoom);
			leafletMap.zoomControl.setPosition(zoomPosition);
			panes?.forEach(({ name, zIndex }) => {
				leafletMap.createPane(name);
				leafletMap.getPane(name).style.zIndex = zIndex;
				leafletMap.getPane(name).style.pointerEvents = 'none';
			});

			mapStore.store(leafletMap);
		}
	});

	onDestroy(() => {
		if (browser) mapStore.remove(); // removes event listeners ?
	});

	setContext('map', {
		getMap: () => leafletMap
	});
</script>

<div id="map">
	{#if $mapStore}
		<slot />
	{/if}
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	@import 'leaflet-draw/dist/leaflet.draw.css';

	#map {
		width: 100vw;
		height: 100vh;
		z-index: 0;
	}

	:global(.leaflet-control-paintpolygon-icon) {
		@apply cursor-pointer;
	}

	:global(.map-viewport) {
		position: fixed;
		margin-left: 344px;
		width: calc(100vw - 344px);
		height: 100%;
	}
</style>
