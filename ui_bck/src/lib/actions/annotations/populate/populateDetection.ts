import { buildDictionary } from '$lib/buildDictionary';
import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { graphicBordersWeight } from '$lib/utils/hardcodedValues';
import { layerStore } from '$stores/Data/annotations';
import { labelsStore } from '$stores/Overlay/label';
import optionsStore from '$stores/Overlay/optionsStore';
import type { Feature } from 'geojson';

const populateDetection = async (feature: Feature) => {
	const labelDictionary = buildDictionary(labelsStore.retrieve());
	const opacity = optionsStore.opacity.retrieve();
	const labelName = feature.properties?.labels[0];
	const color = labelDictionary[labelName];

	const rectangle = L.rectangle(feature.properties?.bbox, {
		color,
		weight: graphicBordersWeight,
		fillOpacity: opacity,
		interactive: false
	});

	layerStore.addLayerWithProperties(
		rectangle as unknown as LayerWithProperties,
		feature.properties,
		AnnotationLayerKeys.detection
	);
};

export default populateDetection;
