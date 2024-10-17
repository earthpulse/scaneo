import { storeInLocalStorage } from '$lib/utils/utils';
import optionsStore from '$stores/Overlay/optionsStore';

const storeOptionsInLocalStorage = () => {
	const options = optionsStore.retrieve();

	storeInLocalStorage('options', options);
};

export default storeOptionsInLocalStorage;
