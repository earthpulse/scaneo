<script>
	import displayAsRectangles from '$lib/actions/image/displayAsReactangles';
	import { selectLabel } from '$lib/actions/label/selectLabel';
	import imageSelectionZoomIn from '$stores/Overlay/imageSelectionZoomIn';
	import quickSelectionZoomOut from '$stores/Overlay/quickSelectionZoomOut';
	import { imagesStore } from '$stores/image';
	import { onDestroy } from 'svelte';
	import LabelSelector from '../Label/LabelSelector.svelte';

	let boxesFeatureGroup = [];

	$: if ($imagesStore.length) boxesFeatureGroup = displayAsRectangles($imagesStore);

	onDestroy(() => {
		boxesFeatureGroup.clearLayers && boxesFeatureGroup?.clearLayers();
	});
</script>

<section class="flex-1 flex flex-col justify-between">
	<LabelSelector labelAction={selectLabel} />

	<div class="form-control">
		<label class="label cursor-pointer flex justify-start gap-5 text-slate-400" for="zoom-out">
			<input
				type="checkbox"
				bind:checked={$quickSelectionZoomOut}
				id="zoom-out"
				class="checkbox checkbox-info"
			/>
			<span class="label-text text-gray-600">Zoom out on Quick selection</span>
		</label>

		<label class="label cursor-pointer flex justify-start gap-5 text-slate-400" for="zoom-in">
			<input
				type="checkbox"
				bind:checked={$imageSelectionZoomIn}
				id="zoom-in"
				class="checkbox checkbox-info"
			/>
			<span class="label-text text-gray-600">Zoom in on selecting image</span>
		</label>
	</div>
</section>
