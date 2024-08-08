<script>
	import { labelsStore } from '$stores/Overlay/label';
	import Label from './Label.svelte';

	export let labelAction;
</script>

<section
	class="flex-1 flex flex-col items-start w-full mt-5 max-h-[23vh] overflow-auto gap-1"
	aria-label="Label Selector"
>
	{#each $labelsStore as label (label.name)}
		<Label {label} {labelAction} />
	{/each}
</section>
