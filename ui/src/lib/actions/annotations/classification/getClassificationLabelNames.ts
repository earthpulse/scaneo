import type { LabelNames } from '$lib/types/types';
import { classificationStore } from '$stores/Data/annotations';

const getClassificationLabelNames = (): LabelNames => {
	const classification_labels = classificationStore.retrieve();
	return classification_labels.map((label) => label.name).flat();
};

export default getClassificationLabelNames;
