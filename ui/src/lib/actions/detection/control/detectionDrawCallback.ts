import { AnnotationLayerKeys } from '$lib/types/types';
import { layerStore } from '$stores/Data/annotations';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentLabelStore } from '$stores/Overlay/label';
import optionsStore from '$stores/Overlay/optionsStore';

const detectionDrawCallback = (e: L.LeafletMouseEvent) => {
	const { layer } = e;

	layer.options.color = currentLabelStore.retrieve().color;
	layer.options.fillOpacity = optionsStore.retrieve().opacity;
	layer.options.interactive = false;
	const bounds = layer.getBounds();

	const properties = {
		labels: [currentLabelStore.retrieve().name],
		bbox: [
			[bounds._southWest.lat, bounds._northEast.lng],
			[bounds._northEast.lat, bounds._southWest.lng]
		]
	};

	layerStore.addLayerWithProperties(layer, properties, AnnotationLayerKeys.detection);

	isEnabledStore.saving.enable();
};

export default detectionDrawCallback;
