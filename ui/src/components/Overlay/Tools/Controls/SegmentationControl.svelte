<script>
	import addSegmentationControl from '$lib/actions/segmentation/control/addSegmentationControl';
	import removeSegmentationControl from '$lib/actions/segmentation/control/removeSegmentationControl';
	import wipePaintPolygonCurrentLayer from '$lib/actions/segmentation/wipePaintPolygonCurrentLayer';
	import { annotationsStore } from '$stores/Data/annotations';
	import mapStore from '$stores/Map/MapStore';
	import { currentLabelStore } from '$stores/Overlay/label';
	import { currentImageStore } from '$stores/image';
	import { onDestroy, onMount } from 'svelte';

	let segmentationControl;

	onMount(async () => {
		await import('$lib/utils/paintPolygon/PaintPolygon');
		segmentationControl = addSegmentationControl();
	});

	onDestroy(() => {
		removeSegmentationControl(segmentationControl);
		segmentationControl = null;
	});

	$: if ($currentLabelStore?.name && $currentImageStore?.name && $mapStore) {
		if (segmentationControl) {
			segmentationControl = wipePaintPolygonCurrentLayer(segmentationControl);
		}
	}
</script>
