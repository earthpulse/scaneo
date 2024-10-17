import { controlPositionDefault, samTools } from '$lib/utils/hardcodedValues';
import { layerStore } from '$stores/Data/annotations';
import mapStore from '$stores/Map/MapStore';

const addSamDrawControls = () => {
	const map = mapStore.retrieve();
	if (!map) return;
	const { prompts: samPrompts } = layerStore.retrieve();

	const samControl = new L.Control.Draw({
		position: controlPositionDefault,
		edit: {
			featureGroup: samPrompts
		},
		draw: samTools
	});

	map.addControl(samControl);

	clickDrawSegmentationButton();

	return samControl as L.Control;
};

const clickDrawSegmentationButton = () => {
	const drawButton = document.getElementsByClassName('leaflet-draw-draw-marker')[0] as HTMLElement;
	if (drawButton) drawButton.click();
};

export default addSamDrawControls;
