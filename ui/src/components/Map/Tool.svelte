<script>
	import LayerStore from '$components/Map/LayerStore.svelte';
	import ImageSelector from '$components/Overlay/ImageSelector.svelte';
	import NewLabel from '$components/Overlay/NewLabel.svelte';
	import { dataProgressStore } from '$stores/Data/progressMonitoring';
	import { currentToolStore } from '$stores/Overlay/currentToolStore';
</script>

{#if !$dataProgressStore.areImagesLoading && !$dataProgressStore.areLabelsLoading}
	<LayerStore />
{/if}

<div class="p-5 w-[280px] flex flex-col justify-between">
	{#if $currentToolStore}
		<div class="flex-1 flex flex-col">
			{#if $currentToolStore.usesLabels}
				<NewLabel />
			{/if}
			<svelte:component this={$currentToolStore.component} />
		</div>
	{/if}

	{#if $currentToolStore.control}
		{#if !$dataProgressStore.areAnnotationsLoading}
			<svelte:component this={$currentToolStore.control} />
		{/if}
	{/if}

	<ImageSelector />
</div>
