import { browser } from '$app/environment';
import type { AnnotationLayerKeys, AnnotationLayers } from '$lib/types/types';
import urlStore from '$stores/Data/urlStore';
import { currentLabelStore } from '$stores/Overlay/label';
import type { BBox, Feature, Point } from 'geojson';
import type { LatLng, LatLngBounds, Layer, LayerGroup, Map } from 'leaflet';
import { backgroundPoint, foregroundPoint } from './hardcodedValues';
import type { BackEndpoints } from './routeUtils/backRoute';

export const storeInLocalStorage = (keyName: string, value: unknown) => {
	localStorage.setItem(keyName, JSON.stringify(value));
};

export const retrieveFromLocalStorage = (keyName: string) => {
	const storedValue = localStorage.getItem(keyName);
	if (!storedValue) return null;
	return JSON.parse(storedValue);
};

export const getLatLngBounds = (bbox: BBox): LatLngBounds => {
	const sw = L.latLng(bbox[1]!, bbox[0]!);
	const ne = L.latLng(bbox[3]!, bbox[2]!);
	return L.latLngBounds(sw, ne);
};

export const getLatLngsFromBounds = (latLngBounds: LatLngBounds): LatLng[] => {
	return [
		latLngBounds.getSouthWest(),
		latLngBounds.getSouthEast(),
		latLngBounds.getNorthEast(),
		latLngBounds.getNorthWest()
	] as LatLng[];
};

export const getLatLng = (feature: Feature) => {
	const geometry = feature.geometry as Point;
	const coordinates = geometry.coordinates.flat();

	let lng, lat;
	if (coordinates.length) {
		[lng, lat] = coordinates[0];
	} else {
		[lng, lat] = coordinates;
	}

	return [lng, lat];
};

const preventDefaultCb = (event: Event) => {
	event.preventDefault();
};

export const blockApplicationInteraction = () => {
	const blocker = document.querySelector('.blocker') as HTMLElement;
	if (!blocker) return;

	blocker.classList.add('z-[999]');
	document.addEventListener('keydown', preventDefaultCb);
};

export const restoreApplicationInteraction = () => {
	const blocker = document.querySelector('.blocker') as HTMLElement;
	if (!blocker) return;

	blocker.style.opacity = '0';

	setTimeout(() => {
		blocker.classList.remove('z-[999]');
		document.removeEventListener('keydown', preventDefaultCb);
	}, 150);
};

export const giveBlockingOverlayOpacity = () => {
	const blocker = document.querySelector('.blocker') as HTMLElement;
	if (!blocker) return;

	blocker.style.transition = 'opacity 0.5s ease-in-out';
	blocker.style.opacity = '0.4';
};

export const unselectMarkerTool = () => {
	const cancelDrawingMarkersButtom = document.querySelector(
		'[title="Cancel drawing"]'
	) as HTMLElement;
	if (cancelDrawingMarkersButtom) cancelDrawingMarkersButtom.click();
};

export const filterSamPromptsByCurrentLabel = (prompts: LayerGroup<any>): Layer[] => {
	const currentLabelName = currentLabelStore.retrieve().name;

	const promptsForCurrentLabel = prompts.getLayers().filter((l) => {
		//@ts-expect-error
		return l.feature?.properties?.labels.includes(currentLabelName);
	});

	return promptsForCurrentLabel;
};

export const getSamPromptPoints = (layer: Layer[]): LatLng[][] => {
	const markerLayers = layer;
	return markerLayers.map((l) => {
		//@ts-expect-error
		const { lat, lng } = l._latlng;
		return [lng, lat];
	});
};

export const getSamPromptPointsLabels = (layer: Layer[]) => {
	return layer.map((l) => {
		//@ts-expect-error
		return l.feature?.properties?.background === backgroundPoint
			? backgroundPoint
			: foregroundPoint;
	});
};

export const askIfWeSave = () => {
	return window.confirm('Do you want to save your progress?');
};

export const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const closeSamEditTool = () => {
	if (!browser) return;

	const saveEditingButton = document.querySelector(
		'[title="Cancel editing, discards all changes"]'
	) as HTMLElement;

	if (saveEditingButton) saveEditingButton.click();
};

export const addLayersToMap = (map: Map, layerObject: AnnotationLayers): void => {
	const layerKeys = Object.keys(layerObject) as AnnotationLayerKeys[];

	layerKeys.forEach((key) => {
		map.addLayer(layerObject[key]);
	});
};

export const removeLayersFromMap = (map: Map, layerObject: AnnotationLayers): void => {
	const layerKeys = Object.keys(layerObject) as AnnotationLayerKeys[];

	layerKeys.forEach((key) => {
		map?.removeLayer(layerObject[key]);
	});
};

export const post = async (body: string, endpoint: BackEndpoints): Promise<Response> => {
	return await fetch(urlStore.retrieve() + endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	});
};
