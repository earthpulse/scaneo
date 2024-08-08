import { get, writable, type Writable } from 'svelte/store';
import type { Label } from '$lib/types/types';

interface CurrentLabelStore extends Partial<Writable<Label>> {
	store: (label: Label) => void;
	retrieve: () => Label;
}

function createCurrentLabelStore(): CurrentLabelStore {
	const currentLabel = writable(<Label>{});
	const { subscribe, set } = currentLabel;

	return {
		subscribe,
		store: (label: Label) => set(label),
		retrieve: () => get(currentLabel)
	};
}

const currentLabelStore = createCurrentLabelStore();

export default currentLabelStore;
