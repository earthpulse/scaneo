import {
	GeojsonPropertiesKeys,
	type AnnotationLayerKeys,
	type AnnotationLayers,
	type InitializedLayers,
	type LayerWithProperties
} from '$lib/types/types';
import { addLayersToMap, removeLayersFromMap } from '$lib/utils/utils';
import type * as typeL from 'leaflet';
import { get, writable, type Writable } from 'svelte/store';

const { tasks } = GeojsonPropertiesKeys;

interface LayerStore extends Partial<Writable<AnnotationLayers>> {
	init: (map: typeL.Map) => void;
	remove: (map: typeL.Map) => void;
	clear: (map: typeL.Map) => void;
	retrieve: () => AnnotationLayers;
	addLayerWithProperties: (
		layer: LayerWithProperties,
		properties: any,
		layerGroup: AnnotationLayerKeys
	) => LayerWithProperties;
	resetLayerGroup: (map: typeL.Map, layerGroup: AnnotationLayerKeys) => void;
	removeLayer: (layer: LayerWithProperties, layerGroup: AnnotationLayerKeys) => void;
}

function createLayerStore(initialValue: AnnotationLayers): LayerStore {
	const layers = writable(initialValue);
	const { subscribe, set } = layers;

	const init = (map: typeL.Map) => {
		const initializedLayers: InitializedLayers = {
			detection: L.featureGroup(),
			segmentation: L.featureGroup(),
			classification: L.featureGroup(),
			prompts: L.featureGroup()
		};
		addLayersToMap(map, initializedLayers);
		set(initializedLayers);
	};

	const remove = (map: typeL.Map) => {
		const currentLayers = get(layers);
		removeLayersFromMap(map, currentLayers);
		set(null as unknown as AnnotationLayers);
	};

	const clear = (map: typeL.Map) => {
		remove(map);
		init(map);
	};

	const addLayerWithProperties = (
		layer: LayerWithProperties,
		properties: any,
		targetGroup: AnnotationLayerKeys
	) => {
		properties[tasks] = [targetGroup];
		// @ts-expect-error
		layer.feature = {
			type: 'Feature',
			properties: { ...properties }
		};

		const graphicAnnotations = get(layers);
		const targetLayerGroup = graphicAnnotations[targetGroup];
		targetLayerGroup.addLayer(layer);

		return layer;
	};

	const resetLayerGroup = (map: typeL.Map, layerGroup: AnnotationLayerKeys) => {
		const graphicAnnotations = get(layers);
		graphicAnnotations[layerGroup].clearLayers();
		addLayersToMap(map, graphicAnnotations);
		set(graphicAnnotations);
	};

	const removeLayer = (layer: LayerWithProperties, layerGroup: AnnotationLayerKeys) => {
		const graphicAnnotations = get(layers);
		const targetLayerGroup = graphicAnnotations[layerGroup];
		targetLayerGroup.removeLayer(layer);
	};

	return {
		subscribe,
		init,
		remove,
		clear,
		retrieve: () => get(layers),
		addLayerWithProperties,
		resetLayerGroup,
		removeLayer
	};
}

const initialLayers: AnnotationLayers = {
	detection: null as unknown as L.LayerGroup,
	segmentation: null as unknown as L.LayerGroup,
	classification: null as unknown as L.LayerGroup,
	prompts: null as unknown as L.LayerGroup
};

const layerStore = createLayerStore(initialLayers);

export default layerStore;
