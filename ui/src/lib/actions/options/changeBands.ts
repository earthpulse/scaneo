import optionsStore from '$stores/Overlay/optionsStore';
import addImageLayerToMap from '../layers/imageLayer/addImageLayerToMap';
import storeOptionsInLocalStorage from './storeOptionsInLocalStorage';

const changeBands = (e: InputEvent) => {
	const { name, value } = e.target as HTMLInputElement;
	const numericalValue = Number(value);

	persistBands(name, numericalValue);

	addImageLayerToMap();
};

const persistBands = (name: string, value: number) => {
	storeInInternalMemory(name, value);
	storeOptionsInLocalStorage();
};

const storeInInternalMemory = (name: string, value: number) => {
	const bands = optionsStore.bands[name as keyof typeof optionsStore.bands];
	bands.store(value);
};

export default changeBands;
