import { AnnotationLayerKeys, type LayerWithProperties } from '$lib/types/types';
import { getLatLngBounds, getLatLngsFromBounds } from '$lib/utils/utils';
import { layerStore } from '$stores/Data/annotations';
import { currentImageStore } from '$stores/image';
import type { BBox } from '@turf/turf';
import getClassificationLabelNames from './getClassificationLabelNames';

const addClassification = async () => {
	const labelNames = getClassificationLabelNames();
	const bbox = currentImageStore.retrieve().bbox as BBox;
	const latLngBounds = getLatLngBounds(bbox);
	const latLngs = getLatLngsFromBounds(latLngBounds);

	const transparentLayer = L.polygon(latLngs, {
		weight: 0,
		fillOpacity: 0,
		interactive: false
	});

	const properties = { labels: labelNames };
	layerStore.addLayerWithProperties(
		transparentLayer as unknown as LayerWithProperties,
		properties,
		AnnotationLayerKeys.classification
	);
};

export default addClassification;
