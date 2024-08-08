import { layerStore } from '$stores/Data/annotations';
import type { FeatureCollection } from 'geojson';

const buildGeojson = (): FeatureCollection => {
	const graphicAnnotations = layerStore.retrieve();
	const { detection, segmentation, classification, prompts } = graphicAnnotations;
	const allLayers = L.layerGroup([detection, segmentation, classification, prompts]);
	return allLayers.toGeoJSON() as FeatureCollection;
};

export default buildGeojson;
