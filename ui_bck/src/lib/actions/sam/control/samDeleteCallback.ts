import type { LayerWithProperties } from '$lib/types/types';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import mapStore from '$stores/Map/MapStore';

const samDeleteCallback = (e: L.LayerEvent) => {
	const { layers } = e;
	const map = mapStore.retrieve();

	layers.eachLayer((layer) => {
		map.removeLayer(layer);
	});

	isEnabledStore.saving.enable();
	isEnabledStore.samMaskRequest.enable();
};

export default samDeleteCallback;
