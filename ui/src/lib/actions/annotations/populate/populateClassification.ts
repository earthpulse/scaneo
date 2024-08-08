import type { LabelNames, Labels } from '$lib/types/types';
import { getLatLng } from '$lib/utils/utils';
import { classificationStore } from '$stores/Data/annotations';
import type { Feature } from 'geojson';
import addClassification from '../classification/addClassification';

const populateClassification = async (feature: Feature) => {
	const [lng, lat] = getLatLng(feature);
	if (!(lng && lat)) return;

	let labels = shapeLabels(feature.properties?.labels);

	classificationStore.store(labels as Labels);

	addClassification();
};

const shapeLabels = (labels: LabelNames): Labels => {
	return labels.map((label: string) => ({ name: label }));
};

export default populateClassification;
