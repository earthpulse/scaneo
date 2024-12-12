import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (id) => {
  const url = `${baseUrl.url}/_models/${id}`;
  return fetcher(url, "DELETE");
};
