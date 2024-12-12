<script>
  import "$styles/app.css";
  import Nav from "./Nav.svelte";
  import plugins from "$stores/plugins.svelte.js";
  // import { PUBLIC_API_URL } from "$env/static/public";
  // import { page } from "$app/stores";
  // import baseUrl from "$stores/baseUrl.svelte.js";

  const { children } = $props();

  // const trimUrl = (url, exp) => url.split(exp)[0];

  $effect(() => {
    // let url = PUBLIC_API_URL || $page.url.origin + $page.url.pathname;

    // // hacky af
    // if (url.includes("/campaigns")) url = trimUrl(url, "/campaigns");
    // else if (url.includes("/models")) url = trimUrl(url, "/models");
    // else if (url.includes("/plugins")) url = trimUrl(url, "/plugins");

    // baseUrl.url = url;
    // console.log("baseUrl", baseUrl.url);
    plugins.retrieve();
  });
</script>

<div class="min-h-screen flex flex-col">
  <Nav />
  <main class="flex flex-col flex-1">
    {@render children()}
  </main>
</div>
