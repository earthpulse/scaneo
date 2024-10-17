import type { ColorValueHex, Label, Labels } from '$lib/types/types';
import { get, writable, type Writable } from 'svelte/store';

interface LabelsStore extends Partial<Writable<Labels>> {
	retrieve: () => Labels;
	add: (label: Label) => void;
	removeBy: (labelName: string) => void;
	changeColor: (label: Label) => void;
}

type labelColorDictionary = {
	[labelName: string]: ColorValueHex;
};

const commonLabelsAndColors: labelColorDictionary = {
	water: '#0084ff',
	vegetation: '#02921a',
	crops: '#eeff00',
	'bare soil': '#ff0000',
	forest: '#177733',
	river: '#00ddff',
	highway: '#7f7f7f',
	industrial: '#ffb600',
	residential: '#ff00fa',
	pasture: '#9aff42'
};

function createLabelsStore(): LabelsStore {
	const labels = writable(initialLabels);
	const { subscribe, update } = labels;

	const add = (label: Label) => {
		let labelColor = label.color || commonLabelsAndColors[label.name.toLowerCase()];
		if (!labelColor) {
			do {
				labelColor = randomHexColor();
			} while (get(labels).some((label) => label.color === labelColor));
		}
		const newLabel: Label = {
			...label,
			color: labelColor
		};
		update((labels) => [...labels, newLabel]);
	};

	const removeBy = (labelName: string) => {
		update((labels) => labels.filter((label) => label.name !== labelName));
	};

	const changeColor = (label: Label) => {
		update((labels) => labels.map((l) => (l.name === label.name ? label : l)));
	};

	return {
		subscribe,
		retrieve: () => get(labels),
		add,
		removeBy,
		changeColor
	};
}
const initialLabels: Labels = [];
const labelsStore: LabelsStore = createLabelsStore();

export default labelsStore;

function randomHexColor() {
	let randomColor = '';
	const matchRegEx = /^#[0-9a-f]{6}$/i;

	do {
		randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	} while (!matchRegEx.test(randomColor));

	return randomColor as ColorValueHex;
}
