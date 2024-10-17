import type { LayerWithProperties } from '$lib/types/types';
import type { FeatureCollection } from 'geojson';

const transformIntoGeojson = (layer: LayerWithProperties) => {
	const geojson = layer.toGeoJSON() as FeatureCollection;

	return geojson.features[0];
};

export default transformIntoGeojson;
