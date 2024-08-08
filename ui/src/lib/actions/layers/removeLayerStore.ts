import { closeSamEditTool } from '$lib/utils/utils';
import { layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';

const removeLayerStore = () => {
	const map = mapStore.retrieve();
	if (!map) return;
	closeSamEditTool();
	layerStore.remove(map);
};

export default removeLayerStore;
