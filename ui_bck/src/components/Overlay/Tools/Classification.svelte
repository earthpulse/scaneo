<script>
	import toggleClassificationLabel from '$lib/actions/annotations/classification/toggleClassificationLabel';
	import LabelSelector from '../Label/LabelSelector.svelte';
</script>

<LabelSelector labelAction={toggleClassificationLabel} />
