<script>
	import { page } from '$app/stores';

	export let links;

	$: path = $page.url.pathname;
</script>

<section class="min-w-[320px] bg-slate-100 p-6 min-h-[100vh]">
	<ol class="flex flex-col gap-3">
		{#each links as link (link.title)}
			<a
				href={link.url}
				class={`${
					path === link.url && 'bg-[#4B6BF9] text-white rounded-sm'
				}  font-medium p-2 text-lg`}>{link.title}</a
			>
			{#if link.subsections?.length}
				<ol class="ml-3 flex flex-col gap-3">
					{#each link.subsections as subsection (subsection.title)}
						<a href={subsection.url}>{subsection.title}</a>
					{/each}
				</ol>
			{/if}
		{/each}
	</ol>
</section>
