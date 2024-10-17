import mapStore from '$stores/Map/MapStore';
import { currentToolStore } from '$stores/Overlay/currentToolStore';

const optimizeMapRenderer = () => {
	return;
	const toolName = currentToolStore.getName();
	const map = mapStore.retrieve();

	if (toolName === 'Quick Selection') {
		map.options.renderer = L.canvas();
	} else {
		map.options.renderer = undefined;
	}
};

export default optimizeMapRenderer;
