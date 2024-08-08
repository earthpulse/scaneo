<script>
	import { classificationStore } from '$stores/Data/annotations';
	import { currentToolStore } from '$stores/Overlay/currentToolStore';
	import TagCheck from 'svelte-material-icons/TagCheck.svelte';

	export let name;

	$: currentLabelNames = $classificationStore.map((label) => label.name.toLowerCase());
	$: isClassification = $currentToolStore.name === 'Classification';
</script>

{#if currentLabelNames.includes(name.toLowerCase())}
	<i
		class="text-2xl {isClassification && 'hover:text-3xl'} mr-2"
		aria-label={`${name} classification tag`}
		><TagCheck color={isClassification ? '#202124' : '#5e5e5e'} /></i
	>
{/if}
