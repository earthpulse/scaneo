import { AnnotationLayerKeys } from '$lib/types/types';
import { layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentLabelStore } from '$stores/Overlay/label';
import { tick } from 'svelte';
import styleSamMarker from '../styleSamMarker';

const samDrawCallback = async (e: L.LeafletMouseEvent) => {
	const currentLabelName = currentLabelStore.retrieve().name;
	const properties = {
		labels: [currentLabelName]
	};

	const promptMarker = layerStore.addLayerWithProperties(
		e.layer,
		properties,
		AnnotationLayerKeys.prompts
	);

	isEnabledStore.saving.enable();
	isEnabledStore.samMaskRequest.enable();

	await tick();

	styleSamMarker(promptMarker as unknown as L.Marker, currentLabelName);
};

export default samDrawCallback;
