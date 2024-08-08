import { maxImagesPerPage } from '$lib/utils/hardcodedValues';
import paginationOffsetStore from '$stores/image/paginationOffsetStore';

const viewImageInSelector = (index: number, imageName: string) => {
	if (index < 0) return;

	const paginationCuttoff = getPaginationOffset(index);
	paginationOffsetStore.set(paginationCuttoff);
	scrollToImage(imageName);
};

const getPaginationOffset = (index: number) => {
	return Math.floor(index / maxImagesPerPage) * maxImagesPerPage;
};

const scrollToImage = (imageName: string) => {
	const imageSelector = document.getElementById('image-selector');
	const image = document.getElementById(imageName);
	if (!imageSelector || !image) return;

	image.scrollIntoView({ behavior: 'smooth' });
};

export default viewImageInSelector;
