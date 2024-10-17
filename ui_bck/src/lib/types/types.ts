import type { Point } from 'geojson';
import type { ComponentType } from 'svelte';
import type Icon from 'svelte-material-icons/CogOutline.svelte';

declare global {
	export module L {
		export namespace Control {
			export let Draw: any;
		}
		export namespace control {
			export let paintPolygon: any;
		}
		export namespace Draw {
			export let Event: any;
		}
	}
}

export type ColorValueHex = `#${string}`;

export interface Label {
	name: string;
	color?: ColorValueHex;
}

export type Labels = Label[];

export interface LabelDictionary {
	[labelName: string]: ColorValueHex;
}

export type LabelName = string;
export type LabelNames = LabelName[];

export interface Image {
	name: string;
	bbox: number[];
	id: string;
}

export type Images = Image[];

export type Prompt = Point;
export type Prompts = Point[];

export type AnnotationLayers = {
	detection: L.LayerGroup;
	segmentation: L.LayerGroup;
	classification: L.LayerGroup;
	prompts: L.LayerGroup;
};

export enum AnnotationLayerKeys {
	detection = 'detection',
	segmentation = 'segmentation',
	classification = 'classification',
	prompts = 'prompts'
}

export enum GeojsonPropertiesKeys {
	labels = 'labels',
	tasks = 'tasks'
}

export type InitializedLayers = {
	[key in AnnotationLayerKeys]: L.FeatureGroup;
};

export type LayerWithProperties = L.LayerGroup & {
	feature: {
		type: string;
		properties: any;
	};
};

export interface DataLoaders {
	areImagesLoading: boolean;
	areLabelsLoading: boolean;
	areAnnotationsLoading: boolean;
}

export type Bands = {
	red: number;
	green: number;
	blue: number;
};

export type Stretch = {
	minimum: number;
	maximum: number;
};

type MapRenderer = 'Canvas' | 'SVG';

export type Tool = {
	name: string;
	icon: Partial<Icon>;
	component: ComponentType;
	control?: ComponentType;
	usesLabels?: true;
};

export type StacLabels = {
	classes: LabelNames;
	name: 'label';
};

export type BackendLabels = LabelName | LabelNames | StacLabels;

export type ToastMessages = {
	loading: string;
	success: string;
};
