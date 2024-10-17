import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';

const detectionDeleteCallback = (e: L.LeafletMouseEvent) => {
	//@ts-expect-error
	const { layers } = e;

	layers.eachLayer((layer: LayerWithProperties) => {
		layerStore.removeLayer(layer, AnnotationLayerKeys.detection);
	});

	isEnabledStore.saving.enable();
};

export default detectionDeleteCallback;
