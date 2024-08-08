import optionsStore from '$stores/Overlay/optionsStore';
import addImageLayerToMap from '../layers/imageLayer/addImageLayerToMap';
import storeOptionsInLocalStorage from './storeOptionsInLocalStorage';

const changeStretch = (e: InputEvent) => {
	const { name, value } = e.target as HTMLInputElement;
	const numericalValue = Number(value);

	persistStretch(name, numericalValue);

	addImageLayerToMap();
};

const persistStretch = (name: string, value: number) => {
	storeInInternalMemory(name, value);
	storeOptionsInLocalStorage();
};

const storeInInternalMemory = (name: string, value: number) => {
	const stretch = optionsStore.stretch[name as keyof typeof optionsStore.stretch];
	stretch.store(value);
};

export default changeStretch;
