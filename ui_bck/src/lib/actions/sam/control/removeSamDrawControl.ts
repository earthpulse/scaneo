import mapStore from '$stores/Map/MapStore';

const removeSamDrawControl = (samControl: L.Control) => {
	const map = mapStore.retrieve();

	if (!map || !samControl) return;

	map.removeControl(samControl);
};

export default removeSamDrawControl;
