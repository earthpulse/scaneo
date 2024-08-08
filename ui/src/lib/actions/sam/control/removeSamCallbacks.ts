import mapStore from '$stores/Map/MapStore';
import samDrawCallback from './samDrawCallback';
import samDeleteCallback from './samDeleteCallback';
import samBackgroundCallback from './samBackgroundCallback';

const removeSamCallbacks = () => {
	const map = mapStore.retrieve();
	if (!map) return;

	removeForegroundMarkerCallback(map);
	removeDeleteMarkerCallback(map);
	deleteBackgroundMarkerCallback(map);
};

const removeForegroundMarkerCallback = (map: L.Map) => {
	map.off(L.Draw.Event.CREATED, samDrawCallback);
};

const removeDeleteMarkerCallback = (map: L.Map) => {
	map.off(L.Draw.Event.DELETED, samDeleteCallback);
};

const deleteBackgroundMarkerCallback = (map: L.Map) => {
	map.off('contextmenu', samBackgroundCallback);
};
export default removeSamCallbacks;
