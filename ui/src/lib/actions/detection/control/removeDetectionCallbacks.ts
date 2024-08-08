import mapStore from '$stores/Map/MapStore';
import detectionDeleteCallback from './detectionDeleteCallback';
import detectionDrawCallback from './detectionDrawCallback';
import detectionEditCallback from './detectionEditCallback';

const removeDetectionCallbacks = () => {
	const map = mapStore.retrieve();
	if (!map) return;

	map.off(L.Draw.Event.CREATED, detectionDrawCallback);
	map.off(L.Draw.Event.EDITED, detectionEditCallback);
	map.off(L.Draw.Event.DELETED, detectionDeleteCallback);
};

export default removeDetectionCallbacks;
