<script>
	import DocsNav from '$components/Docs/DocsNav.svelte';

	const links = [
		{
			title: 'Introduction',
			url: '/docs/',

			subsections: [
				{
					title: 'Overview',
					url: '/docs/'
				},
				{
					title: 'Purpose',
					url: '/docs/'
				}
			]
		},
		{
			title: 'Getting started',
			url: '/docs/getting-started/'
		},
		{
			title: 'User Interface',
			url: '/docs/user-interface/',

			subsections: [
				{
					title: 'Label Selector',
					url: '/docs/user-interface/'
				},
				{
					title: 'Quick Selection',
					url: '/docs/user-interface/'
				},
				{
					title: 'Classification',
					url: '/docs/user-interface/'
				},
				{
					title: 'Segmentation',
					url: '/docs/user-interface/'
				},
				{
					title: 'Detection',
					url: '/docs/user-interface/'
				},
				{
					title: 'SAM (Segment Anything Model)',
					url: '/docs/user-interface/'
				},
				{
					title: 'Options',
					url: '/docs/user-interface/'
				}
			]
		},
		{
			title: 'Images',
			url: '/docs/images/'
		},
		{
			title: 'Saving and Exporting',
			url: '/docs/saving-exporting/'
		},
		{
			title: 'STAC compatibility',
			url: '/docs/stac/'
		},
		{
			title: 'Changelog',
			url: '/docs/changelog/'
		}
	];
</script>

<svelte:head>
	<title>SCANEO | Docs</title>
	<meta name="description" content="Scaneo documentation." />
</svelte:head>

<main class="docs gap-7 flex">
	<DocsNav {links} />

	<section class="p-6">
		<slot />
	</section>
</main>

<style>
	:global(.docs h1) {
		@apply text-3xl;
		@apply font-medium;
		@apply leading-tight;
		@apply mb-5;
	}

	:global(.docs h2) {
		@apply text-2xl;
		@apply mb-3;
	}

	:global(.docs h3) {
		@apply text-xl;
	}

	:global(.docs p) {
		@apply mb-3;
	}
</style>
