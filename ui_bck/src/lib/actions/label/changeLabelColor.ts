import type { ColorValueHex } from '$lib/types/types';
import { labelsStore } from '$stores/Overlay/label';
import saveLabels from './saveLabels';
import { selectLabel } from './selectLabel';

export const changeLabelColor = (labelName: string, color: ColorValueHex) => {
	replaceColorInStore(labelName, color);

	selectLabel({ name: labelName, color });

	saveLabels();
};

const replaceColorInStore = (labelName: string, color: ColorValueHex) => {
	labelsStore.changeColor({ name: labelName, color });
};
