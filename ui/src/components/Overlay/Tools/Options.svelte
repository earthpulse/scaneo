<script>
	import changeBands from '$lib/actions/options/changeBands';
	import changeOpacity from '$lib/actions/options/changeOpacity';
	import changeStretch from '$lib/actions/options/changeStretch';
	import optionsStore from '$stores/Overlay/optionsStore';

	let red, green, blue, minimum, maximum, opacity;
	$: ({
		bands: { red, green, blue },
		stretch: { minimum, maximum },
		opacity
	} = $optionsStore);
</script>

<form
	class="flex-1 form-control w-full h-full max-w-xs flex flex-col gap-5 items text-xl"
	id="bands-and-stretch"
>
	{#if optionsStore}
		<section>
			<legend class="label">
				<span>RGB bands</span>
			</legend>
			<fieldset class="flex gap-3" on:input={changeBands}>
				<input
					required
					type="number"
					placeholder="R"
					name="red"
					class="text-center input input-bordered input-error w-full max-w-xs"
					value={red}
				/>
				<input
					required
					type="number"
					placeholder="G"
					name="green"
					class="text-center input input-bordered input-success w-full max-w-xs"
					value={green}
				/>
				<input
					required
					type="number"
					placeholder="B"
					name="blue"
					class="text-center input input-bordered input-info w-full max-w-xs"
					value={blue}
				/>
			</fieldset>
		</section>

		<section>
			<legend class="label">
				<span>Stretch</span>
			</legend>
			<fieldset class="flex gap-3" on:input={changeStretch}>
				<input
					required
					type="number"
					placeholder="Minimum"
					name="minimum"
					class="input input-bordered w-full max-w-xs"
					value={minimum}
				/>
				<input
					required
					type="number"
					placeholder="Maximum"
					name="maximum"
					class="input input-bordered w-full max-w-xs"
					value={maximum}
				/>
			</fieldset>
		</section>

		<section class="flex flex-col gap-3">
			<label for="opacity-range" class="label">Layer opacity</label>
			<input
				id="opacity-range"
				type="range"
				min="0"
				max="100"
				value={opacity * 100}
				class="range range-primary"
				on:input={changeOpacity}
			/>
		</section>
	{/if}
</form>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
