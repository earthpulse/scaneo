import checkIfEraserIsActive from './checkIfEraserIsActive';
import addSegmentationControl from './control/addSegmentationControl';
import removeSegmentationControl from './control/removeSegmentationControl';

const wipePaintPolygonCurrentLayer = (segmentationControl: L.Control) => {
	const isEraserActive = checkIfEraserIsActive();

	removeSegmentationControl(segmentationControl);

	const newSegmentationControl = addSegmentationControl(isEraserActive);
	return newSegmentationControl;
};

export default wipePaintPolygonCurrentLayer;
