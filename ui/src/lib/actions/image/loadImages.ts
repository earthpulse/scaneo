import type { Image } from '$lib/types/types';
import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import urlStore from '$stores/Data/urlStore';
import { imagesStore } from '$stores/image';


const loadImages = async () => {
	const baseUrl = urlStore.retrieve();
	const response = await fetch(baseUrl + backEndpoints.imagesEndpoint);
	if (!response.ok) return;
	const loadedImages = await response.json();
	const sortedImages = loadedImages.sort((a: Image, b: Image) =>
		a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
			numeric: true,
			ignorePunctuation: true
		})
	);
	imagesStore.store(sortedImages);
	return loadedImages;
};

export default loadImages;
