import { layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';

const initializeLayerStore = () => {
	const map = mapStore.retrieve();
	if (!map) return;
	layerStore.init(map);
};

export default initializeLayerStore;
