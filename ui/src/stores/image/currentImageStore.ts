import type { Image } from '$lib/types/types';
import { get, writable, type Writable } from 'svelte/store';

interface CurrentImageStore extends Partial<Writable<Image>> {
	store: (image: Image) => void;
	retrieve: () => Image;
}

const initialImage: Image = {
	name: '',
	bbox: [0, 0, 0, 0]
};

// interface ImageLayer extends Image {
// 	container: HTMLElement
// }

function createCurrentImageStore(): CurrentImageStore {
	const currentImage = writable(initialImage);
	const { subscribe, set } = currentImage;

	return {
		subscribe,
		store: (image: Image) => set(image),
		retrieve: () => get(currentImage)
	};
}

const currentImageStore = createCurrentImageStore();

export default currentImageStore;
