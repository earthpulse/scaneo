import { currentImageStore } from '$stores/image';
import type { FeatureCollection } from 'geojson';

const buildSaveRequestBody = (geojson: FeatureCollection) => {
	const body = JSON.stringify({
		geojson,
		name: currentImageStore.retrieve().name
	});
	return body;
};

export default buildSaveRequestBody;
