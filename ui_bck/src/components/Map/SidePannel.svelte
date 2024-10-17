<script>
	import { page } from '$app/stores';
	import Header from '$components/Overlay/Header.svelte';
	import Save from '$components/Overlay/Save.svelte';
	import ToolSelector from '$components/Overlay/Tools/ToolSelector.svelte';
	import loadInformation from '$lib/actions/loadInformation';
	import mapStore from '$stores/Map/MapStore';
	import Tool from './Tool.svelte';

	$: if ($page.url.origin && $mapStore) loadInformation();
</script>

<section
	class="fixed z-20 bg-[#fafdfe] flex flex-col m-6 rounded-md h-full w-[320px]"
	style="height: -webkit-fill-available;"
>
	<Header />
	<div class="grid grid-cols-8 h-full">
		<ToolSelector />
		<Tool />
	</div>
	<Save />
</section>
