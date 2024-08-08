import { buildDictionary } from '$lib/buildDictionary';
import hueRotation from '$lib/hueRotation';
import { currentToolStore } from '$stores/Overlay/currentToolStore';
import { currentLabelStore, labelsStore } from '$stores/Overlay/label';

const styleSamMarker = async (marker: L.Marker, labelName: string) => {
	const labelToColorDictionary = buildDictionary(labelsStore.retrieve());
	const [h, s, l] = hueRotation(labelToColorDictionary[labelName]);

	const markerDom = marker.getElement();
	if (!markerDom) return;

	const labelNameWithoutSpaces = labelName.replace(/\s/g, '');

	markerDom.classList.add(`${labelNameWithoutSpaces}-marker`);
	const style = `hue-rotate(${h}deg) saturate(${s}%)`;
	markerDom.style.setProperty('filter', style);
	markerDom.style.setProperty('opacity', '0');

	const currentLabelName = currentLabelStore.retrieve().name;
	if (currentToolStore.getName() !== 'SAM') return;
	if (labelName !== currentLabelName) return;

	markerDom.style.setProperty('opacity', '1');
};

export default styleSamMarker;
