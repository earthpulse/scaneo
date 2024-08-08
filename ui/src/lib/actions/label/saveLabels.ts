import type { Labels } from '$lib/types/types';
import { backEndpoints } from '$lib/utils/routeUtils/backRoute';
import urlStore from '$stores/Data/urlStore';
import { labelsStore } from '$stores/Overlay/label';

const saveLabels = async () => {
	const labels = labelsStore.retrieve();

	const baseUrl = urlStore.retrieve();
	postLabels(labels, baseUrl);
};

const postLabels = async (labels: Labels, baseUrl: string) => {
	const response = await fetch(baseUrl + backEndpoints.labelsEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ labels })
	});

	const responseContent = await response.json();

	if (!response.ok) {
		alert(JSON.stringify(responseContent.detail));
	}
};

export default saveLabels;
