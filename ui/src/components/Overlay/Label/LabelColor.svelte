<script>
	import { changeLabelColor } from '$lib/actions/label/changeLabelColor';
	import optionsStore from '$stores/Overlay/optionsStore';

	export let color;
	export let name;

	$: ({ opacity } = $optionsStore);

	const handleSubmit = () => {
		changeLabelColor(name, color);
	};
</script>

<input
	type="color"
	name="color"
	bind:value={color}
	on:change={() => handleSubmit()}
	class="max-w-[35px] h-[28px] box-border"
	style={`opacity: ${opacity};`}
/>
