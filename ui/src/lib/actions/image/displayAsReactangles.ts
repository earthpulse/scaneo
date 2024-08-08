import type { Image } from '$lib/types/types';
import mapStore from '$stores/Map/MapStore';
import { ClassificationTool } from '$stores/Overlay/currentToolStore';
import quickSelectionZoomOut from '$stores/Overlay/quickSelectionZoomOut';
import type { LatLngBounds, Rectangle } from 'leaflet';
import { get } from 'svelte/store';
import selectTool from '../tool/selectTool';
import centerMap from './centerMap';
import viewImageInSelector from './paginateImageSelector';
import selectImage from './selectImage';

const displayAsRectangles = (images: Image[]) => {
	if (!images.length) return;

	const imagesBounds = getBounds(images);
	const rectangles = buildRectangles(imagesBounds, images);
	const boxesFeatureGroup = displayInMap(rectangles);
	return boxesFeatureGroup;
};

const getBounds = (images: Image[]) => {
	const imagesBounds = images.map((image) => {
		const bbox = image.bbox;
		const c1 = L.latLng(bbox[1]!, bbox[0]!);
		const c2 = L.latLng(bbox[3]!, bbox[2]!);
		return L.latLngBounds(c1, c2);
	});

	return imagesBounds;
};

const buildRectangles = (imageBounds: LatLngBounds[], images: Image[]) => {
	return imageBounds.map((oneImageBounds, index) => {
		return L.rectangle(oneImageBounds, {
			color: 'blue',
			weight: 2,
			fillOpacity: 0,
		}).on('click', () => {
			selectImage(images[index]!);
			selectTool(ClassificationTool);
			viewImageInSelector(index, images[index]?.name!);
		});
	});
};

const displayInMap = (imageBounds: Rectangle<any>[]) => {
	const map = mapStore.retrieve();
	const boxesFeatureGroup = L.featureGroup(imageBounds).addTo(map);

	if (get(quickSelectionZoomOut)) centerMap(boxesFeatureGroup);

	return boxesFeatureGroup;
};

export default displayAsRectangles;
