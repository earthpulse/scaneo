import type { Images } from '$lib/types/types';
import { get, writable, type Writable } from 'svelte/store';

interface ImagesStore extends Partial<Writable<Images>> {
	store: (images: Images) => void;
	retrieve: () => Images;
}

function createImagesStore(initialValue: Images): ImagesStore {
	const images = writable(initialValue);
	const { subscribe, set } = images;

	return {
		subscribe,
		store: (images: Images) => set(images),
		retrieve: () => get(images)
	};
}

const initialImages: Images = [];

const imagesStore = createImagesStore(initialImages);

export default imagesStore;
