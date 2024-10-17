import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { annotationsStore, layerStore } from '$stores/Data/annotations';
import type { FeatureCollection } from 'geojson';
import buildGeojson from '../annotations/buildGeojson';
import persistAnnotationsInLocalMemory from '../annotations/persistAnnotationsInLocalMemory';
import populateSamPrompts from '../annotations/populate/populateSamPrompts';

const showSamPromptsOnlyForCurrentLabel = (): void => {
	removeCurrentSamPrompts();

	const filteredSamPrompts = filterSamPrompts();

	populateOnlySamPrompts(filteredSamPrompts);
};

const removeCurrentSamPrompts = (): void => {
	const geojson = buildGeojson();
	persistAnnotationsInLocalMemory(geojson as FeatureCollection);

	const currentLayers = layerStore.retrieve();
	currentLayers.prompts.getLayers().forEach((layer) => {
		layerStore.removeLayer(layer as LayerWithProperties, AnnotationLayerKeys.prompts);
	});
};

const filterSamPrompts = (): FeatureCollection => {
	const currentAnnotation = annotationsStore.retrieve();
	const filteredSamPrompts = {
		...currentAnnotation,
		features: currentAnnotation?.features?.filter((feature) => feature.properties?.prompt)
	};
	return filteredSamPrompts;
};

const populateOnlySamPrompts = (filteredSamPrompts: FeatureCollection): void => {
	if (!filteredSamPrompts.features?.length) return;

	for (const feature of filteredSamPrompts.features) {
		populateSamPrompts(feature);
	}
};

export default showSamPromptsOnlyForCurrentLabel;
