<script>
	import selectTool from '$lib/actions/tool/selectTool';
	import { toolIconSizeDefault } from '$lib/utils/hardcodedValues';
	import { availableTools, currentToolStore } from '$stores/Overlay/currentToolStore';

	const size = toolIconSizeDefault;
</script>

<div class="col-span-1 bg-slate-100 flex flex-col items-centergap-3">
	{#each availableTools as tool}
		<button
			class={`btn btn-primary px-2 rounded-none 
			${tool.name === $currentToolStore.name && 'btn-active'}
			`}
			on:click={() => selectTool(tool)}
			aria-label={tool.name}
		>
			<svelte:component this={tool.icon} {size} />
		</button>
	{/each}
</div>
