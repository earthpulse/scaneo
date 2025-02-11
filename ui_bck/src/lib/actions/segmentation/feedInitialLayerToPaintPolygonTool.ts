import findCurrentLabelSegmentationLayer from '../layers/segmentation/findCurrentLabelSegmentationLayer';
import transformIntoGeojson from './transformIntoGeojson';

const feedInitialLayerToPaintPolygonTool = () => {
	const initialLayer = findCurrentLabelSegmentationLayer();

	if (!initialLayer) return null;

	const paintPolygonGeojson = transformIntoGeojson(initialLayer);

	return paintPolygonGeojson;
};

export default feedInitialLayerToPaintPolygonTool;
