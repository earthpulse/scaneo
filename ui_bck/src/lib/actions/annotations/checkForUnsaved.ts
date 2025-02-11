import { askIfWeSave } from '$lib/utils/utils';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import saveAnnotations from './saveAnnotations';

const checkForUnsaved = () => {
	const isSavingEnabled = isEnabledStore.saving.retrieve();
	if (!isSavingEnabled) return;

	askIfWeSave() && saveAnnotations();
	isEnabledStore.saving.disable();
};

export default checkForUnsaved;
