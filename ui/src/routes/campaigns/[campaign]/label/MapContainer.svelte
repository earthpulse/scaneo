<script>
	import Map from '$components/Map/Map.svelte';
	import TileLayer from '$components/Map/TileLayer.svelte';
	import MapViewport from './MapViewport.svelte';
</script>

<MapViewport />

<section class="w-full h-full">
	<Map>
		<TileLayer
			url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
			options={{ maxZoom: 20, zIndex: 1}}
		/>
	</Map>
</section>

