import type { FeatureCollection } from 'geojson';
import persistAnnotationsInLocalMemory from './persistAnnotationsInLocalMemory';
import populateGraphics from './populate/populateGraphics';

const insertAnnotations = (geojson: FeatureCollection) => {
	persistAnnotationsInLocalMemory(geojson);

	populateGraphics(geojson);
};

export default insertAnnotations;
