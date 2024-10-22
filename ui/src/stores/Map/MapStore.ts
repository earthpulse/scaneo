import { writable, type Writable } from 'svelte/store';
import { get } from 'svelte/store';
import type * as L from 'leaflet';

interface MapStore extends Partial<Writable<L.Map>> {
	store: (map: L.Map) => void;
	remove: () => void;
	retrieve: () => L.Map;
}

function createMapStore(initialValue: L.Map): MapStore {
	const map = writable(initialValue);
	const { subscribe, set } = map;

	return {
		subscribe,
		store: (map: L.Map) => set(map),
		retrieve: () => get(map),
		remove: () => set(null as unknown as L.Map)
	};
}

const mapStore: MapStore = createMapStore(null as unknown as L.Map);

export default mapStore;
