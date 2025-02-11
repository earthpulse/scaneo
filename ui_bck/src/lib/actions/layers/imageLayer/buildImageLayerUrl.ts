import { imageLayerPaletteDefault } from '$lib/utils/hardcodedValues';
import urlStore from '$stores/Data/urlStore';
import optionsStore from '$stores/Overlay/optionsStore';
import { currentImageStore } from '$stores/image';

const buildImageLayerUrl = () => {
	const baseUrl = urlStore.retrieve();
	const { bands, stretch } = optionsStore.retrieve();
	const bandsString = Object.values(bands).join(',');
	const stretchString = Object.values(stretch).join(',');
	const palette = imageLayerPaletteDefault;
	const currentImageName = currentImageStore.retrieve().name;
	const url = `${baseUrl}images/${currentImageName}/{z}/{x}/{y}.png?bands=${bandsString}&stretch=${stretchString}&palette=${palette}`;

	return url;
};

export default buildImageLayerUrl;
