import type { Image } from '$lib/types/types';
import { imageLayerOptions } from '$lib/utils/hardcodedValues';
import mapStore from '$stores/Map/MapStore';
import imageSelectionZoomIn from '$stores/Overlay/imageSelectionZoomIn';
import { currentImageStore } from '$stores/image';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import buildImageLayerUrl from './buildImageLayerUrl';

let imageLayer: L.TileLayer;

const addImageLayerToMap = async () => {
	const map = mapStore.retrieve();
	const image = currentImageStore.retrieve();
	const url = buildImageLayerUrl();

	if (!map || !image) return;
	if (imageLayer) map.removeLayer(imageLayer);

	imageLayer = L.tileLayer(url, imageLayerOptions).addTo(map);
	const imageContainer = imageLayer.getContainer();
	await tick();
	imageContainer!.ariaLabel = `${image.name} image layer`;

	if (get(imageSelectionZoomIn)) {
		zoomIntoImage(image, map);
	}
};

const zoomIntoImage = (image: Image, map: L.Map) => {
	const c1 = L.latLng(image.bbox[1]!, image.bbox[0]!);
	const c2 = L.latLng(image.bbox[3]!, image.bbox[2]!);

	const bounds = L.latLngBounds(c1, c2);
	map.fitBounds(bounds);
};

export default addImageLayerToMap;
