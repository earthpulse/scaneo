import { backRouteUtils } from '$lib/utils/routeUtils/backRoute';
import { get, writable, type Writable } from 'svelte/store';

interface UrlStore extends Partial<Writable<string>> {
	retrieve: () => string;
	store: (baseUrl: string) => void;
}

function createUrlStore(initialValue: string): UrlStore {
	const baseUrl = writable(initialValue);
	const { subscribe, set } = baseUrl;

	return {
		subscribe,
		retrieve: () => get(baseUrl),
		store: (baseUrl: string) => set(baseUrl)
	};
}

const urlStore: UrlStore = createUrlStore(backRouteUtils.defaultUrl);

export default urlStore;
