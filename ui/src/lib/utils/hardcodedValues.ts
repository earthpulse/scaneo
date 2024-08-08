import type { ColorValueHex, ToastMessages } from '$lib/types/types';
import type { FeatureCollection } from 'geojson';

export const bandsAndStretchDefault = {
	bands: {
		red: 4,
		green: 3,
		blue: 2
	},
	stretch: {
		minimum: 0,
		maximum: 3000
	}
};

export const layerOpacityDefault: number = 0.3;

export const newLabelNameDefault: string = '';
export const newLabelColorDefault: ColorValueHex = '#ff8000';

export const toolIconSizeDefault: number = 22;

export const errorMessageDefault: string = 'Somethig went wrong...';

export const controlPositionDefault: string = 'topright';

export const maskProcessingMessageDefault: string = 'Processing...';
export const maskSuccessMessageDefault: string = 'Mask generated successfully!';

export const samMaskToasts: ToastMessages = {
	loading: 'Processing...',
	success: 'Mask generated successfully!'
};

export const saveAnnotationsToasts: ToastMessages = {
	loading: 'Processing...',
	success: 'Saved!'
};

export const loadInformationToasts: ToastMessages = {
	loading: 'Loading...',
	success: 'Loaded!'
};

export const graphicBordersWeight: number = 0.4;

export const featureCollectionDefault: FeatureCollection = {
	type: 'FeatureCollection',
	features: []
};

export const imageLayerPaletteDefault = 'viridis';
export const imageLayerOptions = { pane: 'default' };

export const samTools = {
	polyline: false,
	circlemarker: false,
	circle: false,
	marker: {
		repeatMode: true
	},
	rectangle: false,
	polygon: false
};

export const polygonTools = {
	polyline: false,
	circlemarker: false,
	circle: false,
	marker: false,
	polygon: false,
	rectangle: {
		repeatMode: true,
		showArea: true,
		showLength: true,
		shapeOptions: {
			weight: 1
		}
	}
};

export const backgroundPoint = 0;
export const foregroundPoint = 1;

export const maxImagesPerPage = 100;
