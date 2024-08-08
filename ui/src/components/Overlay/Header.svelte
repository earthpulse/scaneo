<script>
	import { currentToolStore } from '$stores/Overlay/currentToolStore';
</script>

<header
	class="w-full bg-info py-2 px-3 text-white text-lg flex gap-5 items-center flex-row rounded-t-md justify-center"
>
	<h2>{$currentToolStore.name}</h2>
</header>
