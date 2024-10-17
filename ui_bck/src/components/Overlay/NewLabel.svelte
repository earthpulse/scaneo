<script>
	import { addLabel } from '$lib/actions/label/addLabel';
	import { newLabelColorDefault, newLabelNameDefault } from '$lib/utils/hardcodedValues';
	import { labelsStore } from '$stores/Overlay/label';
	import optionsStore from '$stores/Overlay/optionsStore';

	let name = newLabelNameDefault;
	let color = newLabelColorDefault;

	const handleSubmit = () => {
		const numberOfLabels = $labelsStore.length;
		addLabel(name, color);

		const isLabelAdded = Boolean(numberOfLabels + 1 === $labelsStore.length);
		if (isLabelAdded) name = '';
	};

	$: ({ opacity } = $optionsStore);
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label type="text" name="New label" class="flex">
		<input
			type="text"
			name="name"
			placeholder="New label"
			class="input input-bordered w-full rounded-none rounded-l-md border-r-0 focus:outline-none focus:placeholder-gray-300 focus:border-gray-600 focus:border-r-0"
			bind:value={name}
			autocomplete="off"
		/>
		<button class="btn btn-neutral text-white font-bold text-2xl px-2 rounded-none">+</button>
		<div
			class="flex box-border"
			style={`border: 1px solid ${color}; 	border-radius: 0px 6px 6px 0px;`}
		>
			<input
				type="color"
				name="color"
				bind:value={color}
				class="h-auto box-border"
				style={`opacity: ${opacity};`}
			/>
		</div>
	</label>
</form>

<style>
	:global(input[type='color']) {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 70px;
		background-color: transparent;
		cursor: pointer;
	}

	:global(input[type='color']::-webkit-color-swatch-wrapper) {
		padding: 0;
	}

	:global(input[type='color']::-webkit-color-swatch) {
		border: 0;
		border-radius: 0px 6px 6px 0px;
	}

	:global(input[type='color']::-moz-color-swatch) {
		border: 0;
		border-radius: 0px 6px 6px 0px;
	}
</style>
