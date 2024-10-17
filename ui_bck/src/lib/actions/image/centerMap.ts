import mapStore from '$stores/Map/MapStore';
import type { FeatureGroup } from 'leaflet';

const centerMap = (boxesFeatureGroup: FeatureGroup<any>) => {
	const featureBounds = boxesFeatureGroup.getBounds();
	const map = mapStore.retrieve();
	map.fitBounds(featureBounds);
};

export default centerMap;
