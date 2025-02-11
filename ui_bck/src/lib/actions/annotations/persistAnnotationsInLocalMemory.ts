import { annotationsStore } from '$stores/Data/annotations';
import type { FeatureCollection } from 'geojson';

const persistAnnotationsInLocalMemory = (geojson: FeatureCollection) => {
	annotationsStore.store(geojson);
};

export default persistAnnotationsInLocalMemory;
