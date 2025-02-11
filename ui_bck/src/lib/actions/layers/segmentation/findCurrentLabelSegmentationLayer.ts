import { layerStore } from '$stores/Data/annotations';
import { currentLabelStore } from '$stores/Overlay/label';

const findCurrentLabelSegmentationLayer = () => {
	const { segmentation } = layerStore.retrieve();
	const currentLabelName = currentLabelStore.retrieve().name;

	let currentLabelSegmentationLayer;

	segmentation.eachLayer((layer: any) => {
		if (layer.feature?.properties?.labels.includes(currentLabelName))
			currentLabelSegmentationLayer = layer;
	});

	if (!currentLabelSegmentationLayer) return null;

	return currentLabelSegmentationLayer;
};

export default findCurrentLabelSegmentationLayer;
