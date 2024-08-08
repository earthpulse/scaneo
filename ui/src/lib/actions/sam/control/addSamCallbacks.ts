import mapStore from '$stores/Map/MapStore';
import samDrawCallback from './samDrawCallback';
import samDeleteCallback from './samDeleteCallback';
import samBackgroundCallback from './samBackgroundCallback';

const addSamCallbacks = () => {
	const map = mapStore.retrieve();
	if (!map) return;

	addForegroundMarkerCallback(map);
	addDeleteMarkerCallback(map);
	addBackgroundMarkerCallback(map);
};

const addForegroundMarkerCallback = (map: L.Map) => {
	map.on(L.Draw.Event.CREATED, samDrawCallback);
};

const addDeleteMarkerCallback = (map: L.Map) => {
	map.on(L.Draw.Event.DELETED, samDeleteCallback);
};

const addBackgroundMarkerCallback = (map: L.Map) => {
	map.on('contextmenu', samBackgroundCallback);
};

export default addSamCallbacks;
