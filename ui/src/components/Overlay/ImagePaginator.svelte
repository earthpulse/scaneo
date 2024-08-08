<script>
	import selectImage from '$lib/actions/image/selectImage';
	import { maxImagesPerPage } from '$lib/utils/hardcodedValues';
	import viewport from '$lib/utils/useViewportAction';
	import { currentImageStore, imagesStore } from '$stores/image';
	import paginationOffsetStore from '$stores/image/paginationOffsetStore';
	import { tick } from 'svelte';

	export let filterInput = '';

	$: filteredImages = $imagesStore.length
		? $imagesStore.filter((image) => image.name.toLowerCase().includes(filterInput.toLowerCase()))
		: [];

	$: shownImages = filteredImages.slice(
		$paginationOffsetStore,
		$paginationOffsetStore + maxImagesPerPage
	);

	$: if (filterInput) $paginationOffsetStore = 0;

	function scrollPagination(i) {
		if (i === 0) previousPagination();
		if (i === filteredImages.length - 1) return;
		if (i === shownImages.length - 1) nextPagination();
	}

	function nextPagination() {
		$paginationOffsetStore += maxImagesPerPage / 4;
		shownImages = filteredImages.slice(
			$paginationOffsetStore,
			$paginationOffsetStore + maxImagesPerPage
		);
	}

	let allowPreviousPagination = false;
	const previousPaginationAllower = () => {
		allowPreviousPagination = true;
	};

	async function previousPagination() {
		if (!allowPreviousPagination) return;

		if ($paginationOffsetStore === 0) return;

		allowPreviousPagination = false;

		const currentFirstImage = document.getElementById(shownImages[0].name.split('/').pop());

		$paginationOffsetStore -= maxImagesPerPage / 4;
		$paginationOffsetStore < 0 && ($paginationOffsetStore = 0);
		shownImages = filteredImages.slice(
			$paginationOffsetStore,
			$paginationOffsetStore + maxImagesPerPage
		);

		await tick();
		currentFirstImage.scrollIntoView({ behavior: 'instant', block: 'start', inline: 'nearest' });
	}
</script>

{#if shownImages.length}
	<div class="flex-1 overflow-y-auto">
		<span
			class="px-2 text-gray-500 text-sm mt-5 flex justify-end"
			aria-label="Pagination information"
			>{`${$paginationOffsetStore + 1}-${
				$paginationOffsetStore + maxImagesPerPage < filteredImages.length
					? $paginationOffsetStore + maxImagesPerPage
					: filteredImages.length
			} of ${filteredImages.length}`}</span
		>
		<ul
			class="w-full justify-end overflow-y-auto block"
			id="image-selector"
			on:scroll={() => previousPaginationAllower()}
		>
			{#each shownImages as image, i (image.name)}
				<li
					id={image.name.split('/').pop()}
					use:viewport
					on:enterViewport={(i === shownImages.length - 1 || i === 0) && scrollPagination(i)}
				>
					<button
						class={`max-h-7 tab text-xs ${
							image.name === $currentImageStore.name && 'text-[#202124] bg-lightgray'
						} w-full justify-between pl-2 pr-0 hover:text-[#2576E8]`}
						on:click={selectImage(image)}
					>
						{image.name}
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}
