import { errorMessageDefault, samMaskToasts } from '$lib/utils/hardcodedValues';
import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import {
	blockApplicationInteraction,
	giveBlockingOverlayOpacity,
	post,
	restoreApplicationInteraction,
	unselectMarkerTool
} from '$lib/utils/utils';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import buildGeojson from '../annotations/buildGeojson';
import persistAnnotationsInLocalMemory from '../annotations/persistAnnotationsInLocalMemory';
import toastPromise from '../toastPromise';
import buildSamRequestBody from './buildSamRequestBody';
import insertSamMask from './insertSamMask';

const requestSamMask = async () => {
	persistAnnotationsInLocalMemory(buildGeojson());

	unselectMarkerTool();
	blockApplicationInteraction();
	giveBlockingOverlayOpacity();

	const body = buildSamRequestBody();
	let errorMessage = errorMessageDefault;
	const promise = new Promise<void>(async (resolve, reject) => {
		try {
			const response = await post(body, backEndpoints.samEndpoint);

			if (!response.ok) {
				response.statusText && (errorMessage = errorMessageDefault);
				throw new Error();
			}
			const predictiveGeojson = await response.json();
			insertSamMask(predictiveGeojson);

			resolve();
		} catch (error) {
			reject();
		}
	});

	toastPromise(promise, errorMessage, samMaskToasts);
	promise.finally(() => {
		isEnabledStore.saving.enable();
		restoreApplicationInteraction();
	});
};

export default requestSamMask;
