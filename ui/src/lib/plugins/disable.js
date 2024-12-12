import baseUrl from "$stores/baseUrl.svelte.js";
import { fetcher } from "$lib/utils/fetcher";

export default async (name) => {
  const url = `${baseUrl.url}/_plugins/${name}`;
  return fetcher(url, "DELETE");
};
