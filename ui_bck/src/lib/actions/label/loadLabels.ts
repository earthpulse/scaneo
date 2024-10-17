import type { Label, Labels } from '$lib/types/types';
import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import urlStore from '$stores/Data/urlStore';
import { currentLabelStore, labelsStore } from '$stores/Overlay/label';

const loadLabels = async () => {
	const baseUrl = urlStore.retrieve();
	const response = await fetch(baseUrl + backEndpoints.labelsEndpoint);
	if (!response.ok) return;
	const backendResponse = await response.json();
	if (!backendResponse.status_code) {
		const { labels } = backendResponse;
		if (labels.length) {
			insertLabelsIntoStores(labels as Labels);
		}
	}
};

const insertLabelsIntoStores = (labels: Labels) => {
	for (let label of labels) {
		labelsStore.add(label);
	}

	const insertedLabels = labelsStore.retrieve();
	currentLabelStore.store(insertedLabels[0] as Label);
};

export default loadLabels;
