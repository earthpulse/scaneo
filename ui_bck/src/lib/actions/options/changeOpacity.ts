import optionsStore from '$stores/Overlay/optionsStore';
import refreshLayers from '../annotations/populate/refreshLayers';
import storeOptionsInLocalStorage from './storeOptionsInLocalStorage';

const changeOpacity = (e: InputEvent) => {
	const { value } = e.target as HTMLInputElement;
	const numericalValue = Number(value);

	persistOpacity(numericalValue);

	refreshLayers();
};

const persistOpacity = (opacity: number) => {
	storeInInternalMemory(opacity);
	storeOptionsInLocalStorage();
};

const storeInInternalMemory = (opacity: number) => {
	const opacityOverOne = opacity / 100;
	optionsStore.opacity.store(opacityOverOne);
};

export default changeOpacity;
