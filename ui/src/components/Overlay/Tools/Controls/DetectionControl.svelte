<script>
	import { onDestroy } from 'svelte';
	import { layerStore } from '$stores/Data/annotations';
	import addDetectionCallbacks from '$lib/actions/detection/control/addDetectionCallbacks';
	import removeDetectionCallbacks from '$lib/actions/detection/control/removeDetectionCallbacks';
	import addDetectionControl from '$lib/actions/detection/addDetectionControl';
	import removeDetectionControl from '$lib/actions/detection/removeDetectionControl';

	let detectionControl;

	$: if ($layerStore?.detection) {
		if (!detectionControl) {
			detectionControl = addDetectionControl();
			addDetectionCallbacks();
		}
	}

	onDestroy(() => {
		removeDetectionControl(detectionControl);
		detectionControl = null;
		removeDetectionCallbacks();
	});
</script>
