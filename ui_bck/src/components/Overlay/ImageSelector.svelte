<script>
	import ImagePaginator from './ImagePaginator.svelte';

	let filterInput = '';
</script>

<section class="flex-1 flex flex-col max-h-[40vh]" aria-label="Image selector">
	<ImagePaginator bind:filterInput />

	<form class="flex flex-col justify-end mt-5" on:submit|preventDefault={() => {}}>
		<input
			name="filter"
			type="text"
			placeholder="Filter..."
			class="input input-bordered rounded-md w-full"
			bind:value={filterInput}
		/>
	</form>
</section>
