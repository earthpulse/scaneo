import type { ColorValueHex } from '$lib/types/types';
import { labelsStore } from '$stores/Overlay/label';
import toast from 'svelte-french-toast';
import saveLabels from './saveLabels';
import { selectLabel } from './selectLabel';

export const addLabel = (labelName: string, color: ColorValueHex) => {
	if (!labelName) return;
	if (checkForDuplicates(labelName, color)) return;

	insertLabelIntoStore(labelName, color);

	selectLabel({ name: labelName, color });

	saveLabels();
};

const checkForDuplicates = (labelName: string, color: ColorValueHex) => {
	const labels = labelsStore.retrieve();

	const duplicatedName = labels.some((label) => label.name === labelName);
	const duplicatedColor = labels.some((label) => label.color === color);

	if (duplicatedName) {
		toast.error(`The label "${labelName}" already exists`);
		return true;
	}

	if (duplicatedColor) {
		toast.error(`A label with this color already exists`);
		return true;
	}
	return false;
};

const insertLabelIntoStore = (labelName: string, color: ColorValueHex) => {
	labelsStore.add({ name: labelName, color });
};
