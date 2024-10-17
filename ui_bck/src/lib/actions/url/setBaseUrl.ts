import urlStore from '$stores/Data/urlStore';

const setBaseUrl = (baseUrl: string) => {
	urlStore.store(baseUrl);
};

export default setBaseUrl;
