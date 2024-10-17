import { controlPositionDefault, polygonTools } from '$lib/utils/hardcodedValues';
import { layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';

const addDetectionControl = () => {
	const map = mapStore.retrieve();
	if (!map) return;

	const { detection: rectangles } = layerStore.retrieve();

	const detectionControl = new L.Control.Draw({
		position: controlPositionDefault,
		edit: {
			featureGroup: rectangles
		},
		draw: polygonTools
	});

	map.addControl(detectionControl);

	clickDrawRectangleButton();

	return detectionControl as L.Control;
};

const clickDrawRectangleButton = () => {
	const drawRectangleButton = document.getElementsByClassName(
		'leaflet-draw-draw-rectangle'
	)[0] as HTMLElement;

	if (!drawRectangleButton) return;
	drawRectangleButton.click();
};

export default addDetectionControl;
