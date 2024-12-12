import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async function retrievePlugins() {
  const url = `${baseUrl.api_url}/_plugins`;
  return fetcher(url);
}
