import checkForUnsaved from '$lib/actions/annotations/checkForUnsaved';
import type { Tool } from '$lib/types/types';
import { isEnabledStore } from '$stores/Data/progressMonitoring';
import { currentToolStore } from '$stores/Overlay/currentToolStore';
import refreshLayers from '../annotations/populate/refreshLayers';

const selectTool = (tool: Tool) => {
	const currentToolName = currentToolStore.getName();
	if (currentToolName === tool.name) return;

	checkForUnsaved();
	isEnabledStore.saving.disable();
	isEnabledStore.samMaskRequest.disable();

	currentToolStore.set(tool);
	refreshLayers();
};

export default selectTool;
