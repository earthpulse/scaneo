<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import retrieveOptionsFromLocalStorage from '$lib/actions/options/retrieveOptionsFromLocalStorage';
	import setBaseUrl from '$lib/actions/url/setBaseUrl';
	import '../app.css';

	let url = PUBLIC_API_URL || $page.url.origin + $page.url.pathname;
	$: if (url) {
		if (!url.endsWith('/')) setBaseUrl(url + '/');
		else setBaseUrl(url);
	}
	$: if (browser) retrieveOptionsFromLocalStorage();
</script>

<slot />
