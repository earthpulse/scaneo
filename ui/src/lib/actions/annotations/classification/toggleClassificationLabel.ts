import { AnnotationLayerKeys, type Label } from '$lib/types/types';
import { classificationStore, layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import mapStore from '$stores/Map/MapStore';
import { currentImageStore } from '$stores/image';
import addClassification from './addClassification';

const toggleClassificationLabel = (label: Label) => {
	const imageName = currentImageStore.retrieve().name;
	if (!imageName) return;

	classificationStore.toggle(label);

	classify();
};

const classify = () => {
	isEnabledStore.saving.enable();

	removePreviousClassification();

	const selectedLabels = classificationStore.retrieve();
	if (!selectedLabels.length) return;

	addClassification();
};

const removePreviousClassification = () => {
	const classificationLayers = layerStore.retrieve().classification;
	if (classificationLayers) {
		layerStore.resetLayerGroup(mapStore.retrieve(), AnnotationLayerKeys.classification);
	}
};

export default toggleClassificationLabel;
