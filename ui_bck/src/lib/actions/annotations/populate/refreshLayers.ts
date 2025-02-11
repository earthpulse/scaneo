import optimizeMapRenderer from '$lib/actions/optimizeMapRenderer';
import { annotationsStore, layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';
import populateGraphics from './populateGraphics';

const refreshLayers = () => {
	const currentMap = mapStore.retrieve();
	layerStore.clear(currentMap);

	optimizeMapRenderer();

	const currentAnnotations = annotationsStore.retrieve();
	populateGraphics(currentAnnotations);
};

export default refreshLayers;
