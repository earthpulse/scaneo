import { featureCollectionDefault } from '$lib/utils/hardcodedValues';
import type { FeatureCollection } from 'geojson';
import { get, writable, type Writable } from 'svelte/store';

interface AnnotationStore extends Partial<Writable<FeatureCollection>> {
	store: (annotation: FeatureCollection) => void;
	retrieve: () => FeatureCollection;
	empty: () => void;
}

const createAnnotationsStore = (): AnnotationStore => {
	const annotation = writable(featureCollectionDefault);
	const { subscribe, set } = annotation;

	return {
		subscribe,
		store: (annotation: FeatureCollection) => set(annotation),
		retrieve: () => get(annotation),
		empty: () => set(featureCollectionDefault)
	};
};

const annotationsStore: AnnotationStore = createAnnotationsStore();

export default annotationsStore;
