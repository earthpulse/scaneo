import initializeLayerStore from './initializeLayerStore';
import removeLayerStore from './removeLayerStore';

const resetLayerStore = () => {
	removeLayerStore();
	initializeLayerStore();
};

export default resetLayerStore;
