import { loadInformationToasts } from '$lib/utils/hardcodedValues';
import {
	blockApplicationInteraction,
	giveBlockingOverlayOpacity,
	restoreApplicationInteraction
} from '$lib/utils/utils';
import { dataProgressStore } from '$stores/Data/progressMonitoring';
import { imagesStore } from '$stores/image';
import loadImages from './image/loadImages';
import loadLabels from './label/loadLabels';
import toastPromise from './toastPromise';

const loadInformation = async () => {
	blockApplicationInteraction();
	giveBlockingOverlayOpacity();
	
	await loadLabels();
	dataProgressStore.markLabelsAsLoaded();

	const imagesPromise = new Promise<void>(async (resolve, reject) => {
		try {
			await loadImages();
			dataProgressStore.markImagesAsLoaded();

			const imageCount = imagesStore.retrieve().length;
			if (imageCount === 0) throw new Error();

			resolve();
		} catch (error) {
			reject();
		}
	});

	const errorMessage = `No images found.`;
	toastPromise(imagesPromise, errorMessage, loadInformationToasts);

	imagesPromise.finally(() => restoreApplicationInteraction());
};

export default loadInformation;
