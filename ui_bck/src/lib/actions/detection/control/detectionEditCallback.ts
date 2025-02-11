import type { LayerWithProperties } from '$lib/types/types';
import { isEnabledStore } from '$stores/Data/progressMonitoring';

const detectionEditCallback = (e: L.LeafletMouseEvent) => {
	//@ts-expect-error
	const { layers } = e;

	layers.eachLayer((layer: LayerWithProperties) => {
		if (layer instanceof L.Rectangle) {
			const bounds = layer.getBounds();
			layer.feature.properties.bbox = [
				[bounds.getSouthWest().lat, bounds.getNorthEast().lng],

				[bounds.getNorthEast().lat, bounds.getSouthWest().lng]
			];
		}
		layer.feature.properties.updatedAt = new Date();
	});
	isEnabledStore.saving.enable();
};

export default detectionEditCallback;
