const checkIfEraserIsActive = (): boolean => {
	const eraserClass = 'leaflet-control-paintpolygon-icon-eraser';

	const eraserNode = document.getElementsByClassName(eraserClass)[0];
	if (!eraserNode) return false;
	return eraserNode.classList.contains('leaflet-control-paintpolygon-icon-active');
};

export default checkIfEraserIsActive;
