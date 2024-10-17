<script>
	import ImagePaginator from './ImagePaginator.svelte';
	import ReloadMessage from '$components/ReloadMessage.svelte';
	let filterInput = '';
</script>

<section class="flex-1 flex flex-col max-h-[40vh]" aria-label="Image selector">
	<ReloadMessage />
	<ImagePaginator bind:filterInput />
	<form class="flex flex-col justify-end mt-5" on:submit|preventDefault={() => {}}>
		<input
			name="filter"
			type="text"
			placeholder="Filter..."
			class="w-full rounded-md input input-bordered"
			bind:value={filterInput}
		/>
	</form>
</section>
