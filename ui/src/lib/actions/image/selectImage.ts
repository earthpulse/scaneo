import checkForUnsaved from '$lib/actions/annotations/checkForUnsaved';
import resetLayerStore from '$lib/actions/layers/resetLayerStore';
import type { Image } from '$lib/types/types';
import { annotationsStore, classificationStore } from '$stores/Data/annotations';
import { dataProgressStore, isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentImageStore } from '$stores/image';
import type { FeatureCollection } from 'geojson';
import insertAnnotations from '../annotations/insertAnnotations';
import loadAnnotations from '../annotations/loadAnnotations';
import addImageLayerToMap from '../layers/imageLayer/addImageLayerToMap';

const selectImage = async (image: Image) => {
	const currentImageName = currentImageStore.retrieve().name;
	if (image.name === currentImageName) return;

	checkForUnsaved();
	isEnabledStore.saving.disable();
	isEnabledStore.samMaskRequest.disable();

	currentImageStore.store(image);
	addImageLayerToMap();

	resetLayerStore();
	classificationStore.empty();
	annotationsStore.empty();

	const loadedAnnotations = await loadAnnotations();

	dataProgressStore.markAnnotationsAsLoaded();

	if (!loadedAnnotations || !loadedAnnotations.features) return;
	insertAnnotations(loadedAnnotations as FeatureCollection);
};

export default selectImage;
