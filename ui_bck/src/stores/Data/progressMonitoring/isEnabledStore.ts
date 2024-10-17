import { get, writable, type Writable } from 'svelte/store';

type IsEnabled = {
	saving: boolean;
	samMaskRequest: boolean;
};

interface IsEnabledStore extends Partial<Writable<IsEnabled>> {
	saving: {
		enable: () => void;
		disable: () => void;
		retrieve: () => boolean;
	};
	samMaskRequest: {
		enable: () => void;
		disable: () => void;
		retrieve: () => boolean;
	};
}

const createIsEnabledStore = (): IsEnabledStore => {
	const initialIsEnabled: IsEnabled = {
		saving: false,
		samMaskRequest: false
	};

	const isEnabled = writable(initialIsEnabled);
	const { update, subscribe } = isEnabled;

	return {
		subscribe,
		saving: {
			enable: () => update((isEnabled) => ({ ...isEnabled, saving: true })),
			disable: () => update((isEnabled) => ({ ...isEnabled, saving: false })),
			retrieve: () => get(isEnabled).saving
		},
		samMaskRequest: {
			enable: () => update((isEnabled) => ({ ...isEnabled, samMaskRequest: true })),
			disable: () => update((isEnabled) => ({ ...isEnabled, samMaskRequest: false })),
			retrieve: () => get(isEnabled).samMaskRequest
		}
	};
};

const isEnabledStore: IsEnabledStore = createIsEnabledStore();

export default isEnabledStore;
