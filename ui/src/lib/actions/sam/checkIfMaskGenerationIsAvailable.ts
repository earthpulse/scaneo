import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentLabelStore } from '$stores/Overlay/label';

const checkIfMaskGenerationIsAvailable = (labelName: string) => {
	const currentLabelName = currentLabelStore.retrieve().name;
	if (labelName !== currentLabelName) return;

	isEnabledStore.samMaskRequest.enable();
};

export default checkIfMaskGenerationIsAvailable;
