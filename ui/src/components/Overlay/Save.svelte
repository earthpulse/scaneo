<script>
	import saveAnnotations from '$lib/actions/annotations/saveAnnotations';
	import { isEnabledStore } from '$stores/Data/progressMonitoring';
</script>

<button
	class="w-full bg-action hover:bg-hover py-2 px-3 text-white text-lg flex gap-5 items-center flex-row rounded-b-md justify-center border-b {!$isEnabledStore.saving &&
		' bg-slate-400 hover:bg-slate-400'}"
	on:click={() => saveAnnotations()}
	disabled={!$isEnabledStore.saving}
>
	Save
</button>
