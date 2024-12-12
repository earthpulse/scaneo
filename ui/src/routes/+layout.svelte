<script>
  import "$styles/app.css";
  import Nav from "./Nav.svelte";
  import plugins from "$stores/plugins.svelte.js";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import baseUrl from "$stores/baseUrl.svelte.js";

  const { children } = $props();

  const trimUrl = (url, exp) => url.split(exp)[0];
  // required to work with multi-path proxies (eotdl eox workspace)
  $effect(() => {
    let url = PUBLIC_API_URL || $page.url.origin + $page.url.pathname;
    // hacky af (add here all the first level routes)
    if (url.includes("/campaigns")) url = trimUrl(url, "/campaigns");
    else if (url.includes("/models")) url = trimUrl(url, "/models");
    else if (url.includes("/plugins")) url = trimUrl(url, "/plugins");
    // Remove trailing slash if present
    url = url.replace(/\/+$/, "");
    baseUrl.url = url;
    baseUrl.api_url = url;
    if (import.meta.env.MODE == "development") baseUrl.url = $page.url.origin;
    plugins.retrieve();
  });
</script>

<div class="min-h-screen flex flex-col">
  <Nav />
  <main class="flex flex-col flex-1">
    {@render children()}
  </main>
</div>
