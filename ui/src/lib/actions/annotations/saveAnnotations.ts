import { errorMessageDefault, saveAnnotationsToasts } from '$lib/utils/hardcodedValues';
import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import { blockApplicationInteraction, post, restoreApplicationInteraction } from '$lib/utils/utils';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import type { FeatureCollection } from 'geojson';
import toastPromise from '../toastPromise';
import buildGeojson from './buildGeojson';
import buildSaveRequestBody from './buildSaveRequestBody';
import persistAnnotationsInLocalMemory from './persistAnnotationsInLocalMemory';

const saveAnnotations = async () => {
	const geojson = buildGeojson();
	persistAnnotationsInLocalMemory(geojson as FeatureCollection);

	blockApplicationInteraction();

	const body = buildSaveRequestBody(geojson);
	let errorMessage = errorMessageDefault;
	const promise = new Promise<void>(async (resolve, reject) => {
		try {
			const response = await post(body, backEndpoints.geojsonEndpoint);
			if (!response.ok) {
				response.statusText && (errorMessage = errorMessageDefault);
				throw new Error();
			}

			const responseJson = await response.json();
			resolve();
		} catch (error) {
			reject();
		}
	});

	isEnabledStore.saving.disable();

	restoreApplicationInteraction();
	toastPromise(promise, errorMessage, saveAnnotationsToasts);
};

export default saveAnnotations;
