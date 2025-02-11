import {
	filterSamPromptsByCurrentLabel,
	getSamPromptPoints,
	getSamPromptPointsLabels
} from '$lib/utils/utils';
import { layerStore } from '$stores/Data/annotations';
import { currentLabelStore } from '$stores/Overlay/label';
import optionsStore from '$stores/Overlay/optionsStore';
import { currentImageStore } from '$stores/image';

const buildSamRequestBody = () => {
	const { prompts } = layerStore.retrieve();
	const filteredSamPrompts = filterSamPromptsByCurrentLabel(prompts);
	const points = getSamPromptPoints(filteredSamPrompts);
	const pointsBackgroundOrForeground = getSamPromptPointsLabels(filteredSamPrompts);
	const currentImageName = currentImageStore.retrieve().name;
	const currentLabelName = currentLabelStore.retrieve().name;
	const { bands, stretch } = optionsStore.retrieve();
	const currentBandAndStretch = {
		bands,
		stretch
	};

	const body = JSON.stringify({
		points,
		pointsLabel: pointsBackgroundOrForeground,
		image: currentImageName,
		label: currentLabelName,
		bands: currentBandAndStretch
	});
	return body;
};
export default buildSamRequestBody;
