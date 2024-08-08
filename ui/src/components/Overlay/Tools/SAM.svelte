<script>
	import { selectLabel } from '$lib/actions/label/selectLabel';
	import requestSamMask from '$lib/actions/sam/requestSamMask';
	import isEnabledStore from '$stores/Data/progressMonitoring/isEnabledStore';
	import LabelSelector from '../Label/LabelSelector.svelte';
</script>

<section class="flex-1 flex flex-col items-start w-full">
	<LabelSelector labelAction={selectLabel} />

	<button
		on:click={requestSamMask}
		class={`btn w-full btn-neutral text-white text-lg my-5 font-bold ${
			!$isEnabledStore.samMaskRequest && 'btn-disabled'
		}`}>Generate mask</button
	>
</section>

<style>
	:global(.background-marker) {
		filter: saturate(0) !important;
	}
</style>
