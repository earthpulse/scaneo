export const frontEndpoints = {
	home: '/'
} as const;

export const frontRouteUtils = {
	baseUrl: 'http://localhost:5173/',
	...frontEndpoints
} as const;

export type FrontEndpoints = (typeof frontEndpoints)[keyof typeof frontEndpoints];
