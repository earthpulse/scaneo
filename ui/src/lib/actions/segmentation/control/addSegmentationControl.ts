import mapStore from '$stores/Map/MapStore';
import feedInitialLayerToPaintPolygonTool from '../feedInitialLayerToPaintPolygonTool';
import segmentationDrawCallback from '../segmentationDrawCallback';

const addSegmentationControl = (isEraserActive = false) => {
	const map = mapStore.retrieve();
	if (!map) return;

	const segmentationControl = L.control
		.paintPolygon({
			initData: feedInitialLayerToPaintPolygonTool,
			drawCallback: segmentationDrawCallback,
			selectEraser: isEraserActive
		})
		.addTo(map);

	return segmentationControl;
};

export default addSegmentationControl;
