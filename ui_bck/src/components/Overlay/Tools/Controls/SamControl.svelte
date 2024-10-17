<script>
	import { onDestroy, onMount } from 'svelte';
	import addSamDrawControls from '$lib/actions/sam/control/addSamDrawControl';
	import removeSamDrawControl from '$lib/actions/sam/control/removeSamDrawControl';
	import addSamCallbacks from '$lib/actions/sam/control/addSamCallbacks';
	import removeSamCallbacks from '$lib/actions/sam/control/removeSamCallbacks';

	let samControl;

	onMount(() => {
		samControl = addSamDrawControls();
		addSamCallbacks();
	});

	onDestroy(() => {
		removeSamDrawControl(samControl);
		removeSamCallbacks();
	});
</script>
