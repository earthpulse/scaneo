export const backEndpoints = {
	labelsEndpoint: 'labels',
	geojsonEndpoint: 'geojson',
	imagesEndpoint: 'images',
	samEndpoint: 'sam'
} as const;

export const backRouteUtils = {
	defaultUrl: "",
	...backEndpoints
} as const;

export type BackEndpoints = (typeof backEndpoints)[keyof typeof backEndpoints];
