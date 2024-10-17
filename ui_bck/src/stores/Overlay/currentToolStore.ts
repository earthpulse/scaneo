import Classification from '$components/Overlay/Tools/Classification.svelte';
import DetectionControl from '$components/Overlay/Tools/Controls/DetectionControl.svelte';
import SamControl from '$components/Overlay/Tools/Controls/SamControl.svelte';
import SegmentationControl from '$components/Overlay/Tools/Controls/SegmentationControl.svelte';
import Options from '$components/Overlay/Tools/Options.svelte';
import QuickSelection from '$components/Overlay/Tools/QuickSelection.svelte';
import SAM from '$components/Overlay/Tools/SAM.svelte';
import Segmentation from '$components/Overlay/Tools/Segmentation.svelte';
import type { Tool } from '$lib/types/types';
import AutoFix from 'svelte-material-icons/AutoFix.svelte';
import Brush from 'svelte-material-icons/Brush.svelte';
import CogOutline from 'svelte-material-icons/CogOutline.svelte';
import HexagonMultipleOutline from 'svelte-material-icons/HexagonMultipleOutline.svelte';
import MapMarkerQuestionOutline from 'svelte-material-icons/MapMarkerQuestionOutline.svelte';
import TagPlus from 'svelte-material-icons/TagPlus.svelte';
import { get, writable, type Writable } from 'svelte/store';

const SegmentationTool: Tool = {
	name: 'Segmentation',
	icon: Brush,
	component: Segmentation,
	control: SegmentationControl,
	usesLabels: true
};

const QuickSelectionTool: Tool = {
	name: 'Quick Selection',
	icon: HexagonMultipleOutline,
	component: QuickSelection,
	usesLabels: true
};

export const ClassificationTool: Tool = {
	name: 'Classification',
	icon: TagPlus,
	component: Classification,
	usesLabels: true
};

const DetectionTool: Tool = {
	name: 'Detection',
	icon: MapMarkerQuestionOutline,
	component: Segmentation,
	control: DetectionControl,
	usesLabels: true
};

const SAMTool: Tool = {
	name: 'SAM',
	icon: AutoFix,
	component: SAM,
	control: SamControl,
	usesLabels: true
};

const OptionsTool: Tool = {
	name: 'Options',
	icon: CogOutline,
	component: Options
};

export const availableTools: Tool[] = [
	QuickSelectionTool,
	ClassificationTool,
	SegmentationTool,
	DetectionTool,
	// SAMTool,
	OptionsTool
];

interface CurrentToolStore extends Partial<Writable<Tool>> {
	set: (tool: Tool) => void;
	getName: () => string;
}

function createCurrentToolStore(): CurrentToolStore {
	const currentTool = writable(availableTools[0]);
	const { subscribe, set } = currentTool;

	return {
		subscribe,
		set: (tool: Tool) => set(tool),
		getName: () => get(currentTool).name
	};
}

export const currentToolStore = createCurrentToolStore();
