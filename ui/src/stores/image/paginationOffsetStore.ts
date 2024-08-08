import { writable, type Writable } from 'svelte/store';

interface PaginationOffsetStore extends Partial<Writable<number>> {
	set: (offset: number) => void;
}

function createPaginationStore(): PaginationOffsetStore {
	const offset = writable(0);
	const { subscribe, set } = offset;

	return {
		subscribe,
		set: (offset: number) => set(offset)
	};
}

const paginationOffsetStore = createPaginationStore();

export default paginationOffsetStore;
