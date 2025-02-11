import type { Bands, Stretch } from '$lib/types/types';
import { bandsAndStretchDefault, layerOpacityDefault } from '$lib/utils/hardcodedValues';
import { get, writable, type Writable } from 'svelte/store';

type Options = {
	bands: Bands;
	stretch: Stretch;
	opacity: number;
};

interface OptionsStore extends Partial<Writable<Options>> {
	bands: {
		red: {
			store: (red: number) => void;
			retrieve: () => number;
		};
		green: {
			store: (green: number) => void;
			retrieve: () => number;
		};
		blue: {
			store: (blue: number) => void;
			retrieve: () => number;
		};
	};
	stretch: {
		minimum: {
			store: (minimum: number) => void;
			retrieve: () => number;
		};
		maximum: {
			store: (maximum: number) => void;
			retrieve: () => number;
		};
	};
	opacity: {
		store: (opacity: number) => void;
		retrieve: () => number;
	};
	retrieve: () => Options;
	setOptions: (options: Options) => void;
}

const initialOptions: Options = { ...bandsAndStretchDefault, opacity: layerOpacityDefault };

function createOptionsStore(): OptionsStore {
	const options = writable(initialOptions);
	const { subscribe, update, set } = options;

	return {
		subscribe,
		bands: {
			red: {
				store: (red: number) =>
					update((options) => ({ ...options, bands: { ...options.bands, red } })),
				retrieve: () => get(options).bands.red
			},
			green: {
				store: (green: number) =>
					update((options) => ({ ...options, bands: { ...options.bands, green } })),
				retrieve: () => get(options).bands.green
			},
			blue: {
				store: (blue: number) =>
					update((options) => ({ ...options, bands: { ...options.bands, blue } })),
				retrieve: () => get(options).bands.blue
			}
		},
		stretch: {
			minimum: {
				store: (minimum: number) =>
					update((options) => ({ ...options, stretch: { ...options.stretch, minimum } })),
				retrieve: () => get(options).stretch.minimum
			},
			maximum: {
				store: (maximum: number) =>
					update((options) => ({ ...options, stretch: { ...options.stretch, maximum } })),
				retrieve: () => get(options).stretch.maximum
			}
		},
		opacity: {
			store: (opacity: number) => update((options) => ({ ...options, opacity })),
			retrieve: () => get(options).opacity
		},
		retrieve: () => get(options),
		setOptions: (options: Options) => set(options)
	};
}

const optionsStore = createOptionsStore();

export default optionsStore;
