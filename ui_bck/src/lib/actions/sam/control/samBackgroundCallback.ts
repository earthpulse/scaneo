import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { backgroundPoint } from '$lib/utils/hardcodedValues';
import { layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentLabelStore } from '$stores/Overlay/label';
import { tick } from 'svelte';

const samBackgroundCallback = async (e: L.LeafletMouseEvent) => {
	const enabledAddMarkerButtonHtmlCollection = document.getElementsByClassName(
		'leaflet-draw-toolbar-button-enabled'
	);
	if (!enabledAddMarkerButtonHtmlCollection.length) return;

	const marker = L.marker(e.latlng);
	const currentLabelName = currentLabelStore.retrieve().name;
	const properties = {
		background: backgroundPoint,
		labels: [currentLabelName]
	};

	const backgroundMarker = layerStore.addLayerWithProperties(
		marker as unknown as LayerWithProperties,
		properties,
		AnnotationLayerKeys.prompts
	);

	isEnabledStore.saving.enable();
	isEnabledStore.samMaskRequest.enable();

	await tick();
	const backgroundMarkerDom = (backgroundMarker as unknown as L.Marker).getElement();
	backgroundMarkerDom?.classList.add('background-marker');
};

export default samBackgroundCallback;
