import { get, writable, type Writable } from 'svelte/store';
import type { Label, Labels } from '$lib/types/types';

interface ClassificationStore extends Partial<Writable<Labels>> {
	store: (labels: Labels) => void;
	toggle: (label: Label) => void;
	retrieve: () => Labels;
	empty: () => void;
}

function createClassificationStore(): ClassificationStore {
	const classification = writable(emptyClassification);
	const { subscribe, set } = classification;

	const toggle = (label: Label) => {
		const currentClassification = get(classification);
		const currentLabelNames = currentClassification.map((label) => label.name);
		let updatedClassification;
		if (!currentLabelNames.includes(label.name))
			updatedClassification = [...currentClassification, label];
		else
			updatedClassification = currentClassification.filter(
				(currentLabel) => currentLabel.name !== label.name
			);

		set(updatedClassification);
	};
	return {
		subscribe,
		store: (labels: Labels) => set(labels),
		toggle,
		retrieve: () => get(classification),
		empty: () => set(emptyClassification)
	};
}

const emptyClassification: Labels = [];

const classificationStore: ClassificationStore = createClassificationStore();

export default classificationStore;
