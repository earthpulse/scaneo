import { AnnotationLayerKeys, GeojsonPropertiesKeys, type Labels } from '$lib/types/types';
import { classificationStore } from '$stores/Data/annotations';
import type { Feature, FeatureCollection } from 'geojson';
import populateClassification from './populateClassification';
import populateDetection from './populateDetection';
import populateSamPrompts from './populateSamPrompts';
import populateSegmentation from './populateSegmentation';

const populateGraphics = (geojson: FeatureCollection) => {
	resetClassificationStore();
	differentiateTasks(geojson);
};

const { tasks: tasksKey } = GeojsonPropertiesKeys;

const differentiateTasks = (geojson: FeatureCollection) => {
	geojson.features.forEach((feature: Feature) => {
		const tasks = feature.properties?.[tasksKey]?.[0];
		if (!tasks) return;

		if (tasks.includes(AnnotationLayerKeys.classification)) {
			populateClassification(feature);
			return;
		}
		if (tasks.includes(AnnotationLayerKeys.segmentation)) {
			populateSegmentation(feature);
			return;
		}
		if (tasks.includes(AnnotationLayerKeys.detection)) {
			populateDetection(feature);
			return;
		}
		if (tasks.includes(AnnotationLayerKeys.prompts)) {
			populateSamPrompts(feature);
			return;
		}
	});
};

const resetClassificationStore = () => {
	classificationStore.store([] as Labels);
};

export default populateGraphics;
