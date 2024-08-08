import mapStore from '$stores/Map/MapStore';
import detectionDeleteCallback from './detectionDeleteCallback';
import detectionDrawCallback from './detectionDrawCallback';
import detectionEditCallback from './detectionEditCallback';

const addDetectionCallbacks = () => {
	const map = mapStore.retrieve();
	if (!map) return;

	map.on(L.Draw.Event.CREATED, detectionDrawCallback);
	map.on(L.Draw.Event.EDITED, detectionEditCallback);
	map.on(L.Draw.Event.DELETED, detectionDeleteCallback);
};

export default addDetectionCallbacks;
