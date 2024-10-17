import {
	AnnotationLayerKeys,
	GeojsonPropertiesKeys,
	type LayerWithProperties
} from '$lib/types/types';
import { layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentLabelStore } from '$stores/Overlay/label';
import optionsStore from '$stores/Overlay/optionsStore';
import type { Feature } from 'geojson';
import findCurrentLabelSegmentationLayer from '../layers/segmentation/findCurrentLabelSegmentationLayer';

const { tasks } = GeojsonPropertiesKeys;

const segmentationDrawCallback = (currentLayer: Feature) => {
	const previousLayer = findCurrentLabelSegmentationLayer();

	if (previousLayer) {
		layerStore.removeLayer(previousLayer, AnnotationLayerKeys.segmentation);
	}
	if (currentLayer) {
		if (currentLayer.properties) {
			currentLayer.properties.labels = [currentLabelStore.retrieve().name]; // required to work...
			currentLayer.properties[tasks] = ['segmentation'];
		}
	}
	const opacity = optionsStore.retrieve().opacity;
	const segmentationLayer = L.geoJSON(currentLayer, {
		style: {
			color: currentLabelStore.retrieve().color,
			weight: 0.4,
			fillOpacity: opacity,
			interactive: false
		}
	});
	const properties = {
		labels: [currentLabelStore.retrieve().name],
		multipolygon: true
	};
	layerStore.addLayerWithProperties(
		segmentationLayer as LayerWithProperties,
		properties,
		AnnotationLayerKeys.segmentation
	);
	isEnabledStore.saving.enable();

	return segmentationLayer;
};

export default segmentationDrawCallback;
