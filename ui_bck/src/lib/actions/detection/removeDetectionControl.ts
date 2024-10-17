import mapStore from '$stores/Map/MapStore';

const removeDetectionControl = (detectionControl: L.Control) => {
	const map = mapStore.retrieve();
	if (!map || !detectionControl) return;

	map.removeControl(detectionControl);
};

export default removeDetectionControl;
