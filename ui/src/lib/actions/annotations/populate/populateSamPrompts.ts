import checkIfMaskGenerationIsAvailable from '$lib/actions/sam/checkIfMaskGenerationIsAvailable';
import styleSamMarker from '$lib/actions/sam/styleSamMarker';
import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { backgroundPoint } from '$lib/utils/hardcodedValues';
import { layerStore } from '$stores/Data/annotations';
import type { Feature } from 'geojson';
import type { Marker } from 'leaflet';
import { tick } from 'svelte';

const populateSamPrompts = async (feature: Feature) => {
	if (feature.geometry.type !== 'Point') return;

	const [lng, lat] = feature.geometry.coordinates;
	if (!lng || !lat) return;
	const latLng = L.latLng(lat, lng);
	const samPrompt = L.marker(latLng);

	const marker = layerStore.addLayerWithProperties(
		samPrompt as unknown as LayerWithProperties,
		feature.properties,
		AnnotationLayerKeys.prompts
	);

	if (!feature.properties?.labels.length) return;
	const labelName = feature.properties.labels[0];

	styleSamMarker(samPrompt, labelName);
	checkIfMaskGenerationIsAvailable(labelName);

	if (feature.properties?.background !== backgroundPoint) return;

	await tick();

	const backgroundMarkerDom = (marker as unknown as Marker).getElement();
	backgroundMarkerDom?.classList.add('background-marker');
};

export default populateSamPrompts;
