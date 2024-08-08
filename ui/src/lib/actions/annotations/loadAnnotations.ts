import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import { dataProgressStore } from '$stores/Data/progressMonitoring';
import urlStore from '$stores/Data/urlStore';
import { currentImageStore } from '$stores/image';

const loadAnnotations = async () => {
	const baseUrl = urlStore.retrieve();
	dataProgressStore.markAnnotationsAsLoading();

	const currentImageName = currentImageStore.retrieve()?.name;
	if (!currentImageName) return;

	const uri = baseUrl + backEndpoints.geojsonEndpoint + '/' + currentImageName;
	const res = await fetch(uri);

	if (!res.ok) return;
	const loadedAnnotations = await res.json();

	if (loadedAnnotations['status_code']) return;
	return loadedAnnotations;
};

export default loadAnnotations;
