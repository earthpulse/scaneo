import { retrieveFromLocalStorage } from '$lib/utils/utils';
import optionsStore from '$stores/Overlay/optionsStore';

const retrieveOptionsFromLocalStorage = () => {
	const options = retrieveFromLocalStorage('options');

	if (!options) return;

	optionsStore.setOptions(options);
};

export default retrieveOptionsFromLocalStorage;
