<script>
	import { currentToolStore } from '$stores/Overlay/currentToolStore';
	import { currentLabelStore } from '$stores/Overlay/label';
	import LabelClassificationTag from './LabelClassificationTag.svelte';
	import LabelColor from './LabelColor.svelte';
	import LabelTitle from './LabelTitle.svelte';

	export let label, labelAction;

	$: ({ name, color } = label);
	$: isClassification = $currentToolStore.name === 'Classification';
</script>

<button
	class={`tab ${
		label.name === $currentLabelStore.name && !isClassification && 'text-[#202124] bg-lightgray'
	} w-full justify-between pl-2 pr-0 hover:text-[#2576E8]`}
	on:click={() => labelAction(label)}
>
	<LabelTitle {name} />

	<div class="flex h-full">
		<LabelClassificationTag {name} />

		<LabelColor {name} {color} />
	</div>
</button>
