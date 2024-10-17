import { restoreApplicationInteraction } from '$lib/utils/utils';
import { annotationsStore, layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';
import { currentLabelStore } from '$stores/Overlay/label';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { get, type Readable } from 'svelte/store';
import populateGraphics from '../annotations/populate/populateGraphics';

const insertSamMask = (predictiveGeojson: FeatureCollection) => {
	clearCurrentGraphics();

	const mergedGeojson = mergeGeojson(predictiveGeojson);
	populateGraphics(mergedGeojson);

	restoreApplicationInteraction();
};

const mergeGeojson = (predictiveGeojson: FeatureCollection) => {
	const filteredGeojson = excludeCurrentLabelMultypolygons();

	const mergedGeojson = {
		...filteredGeojson,
		features: [...filteredGeojson.features, ...predictiveGeojson.features]
	} as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
	return mergedGeojson;
};

const excludeCurrentLabelMultypolygons = () => {
	const currentLabelName = currentLabelStore.retrieve().name;
	const currentGeojson = annotationsStore.retrieve();

	const filteredFeatures = currentGeojson?.features?.filter((feature) => {
		if (feature.geometry.type !== 'MultiPolygon') return true;
		if (!feature.properties?.labels.includes(currentLabelName)) return true;
		return false;
	});

	const filteredGeojson = {
		...currentGeojson,
		features: filteredFeatures
	};
	return filteredGeojson;
};

const clearCurrentGraphics = () => {
	const currentMap = get(mapStore as Readable<L.Map>);
	layerStore.clear(currentMap);
};

export default insertSamMask;
