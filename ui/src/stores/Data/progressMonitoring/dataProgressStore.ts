import type { DataLoaders } from '$lib/types/types';
import { get, writable, type Writable } from 'svelte/store';

interface DataProgressStore extends Partial<Writable<DataLoaders>> {
	markImagesAsLoaded: () => void;
	markLabelsAsLoaded: () => void;
	markLabelsAsLoading: () => void;
	markImagesAsLoading: () => void;
	markAnnotationsAsLoaded: () => void;
	markAnnotationsAsLoading: () => void;
	isDataLoading: () => boolean;
	retrieve: () => DataLoaders;
}

const createDataProgressStore = (): DataProgressStore => {
	const dataProgress = writable({
		areImagesLoading: true,
		areLabelsLoading: true,
		areAnnotationsLoading: true
	} as DataLoaders);

	const { subscribe, update } = dataProgress;

	const markImagesAsLoaded = () => update((current) => ({ ...current, areImagesLoading: false }));
	const markLabelsAsLoaded = () => update((current) => ({ ...current, areLabelsLoading: false }));
	const markAnnotationsAsLoaded = () =>
		update((current) => ({ ...current, areAnnotationsLoading: false }));

	const markLabelsAsLoading = () => update((current) => ({ ...current, areLabelsLoading: true }));
	const markImagesAsLoading = () => update((current) => ({ ...current, areImagesLoading: true }));
	const markAnnotationsAsLoading = () =>
		update((current) => ({ ...current, areAnnotationsLoading: true }));

	const isDataLoading = () => {
		const current = get(dataProgress);
		return current.areImagesLoading || current.areLabelsLoading;
	};

	return {
		subscribe,
		markImagesAsLoaded,
		markLabelsAsLoaded,
		markAnnotationsAsLoaded,
		markLabelsAsLoading,
		markImagesAsLoading,
		markAnnotationsAsLoading,
		isDataLoading,
		retrieve: () => get(dataProgress)
	};
};

const dataProgressStore: DataProgressStore = createDataProgressStore();

export default dataProgressStore;
