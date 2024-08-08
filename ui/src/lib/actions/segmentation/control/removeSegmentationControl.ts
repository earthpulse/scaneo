import mapStore from '$stores/Map/MapStore';

const removeSegmentationControl = (segmentationControl: L.Control) => {
	const map = mapStore.retrieve();
	if (!map || !segmentationControl) return;

	map.removeControl(segmentationControl);
};

export default removeSegmentationControl;
