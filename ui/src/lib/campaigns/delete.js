import baseUrl from "$stores/baseUrl.svelte.js";
import { fetcher } from "$lib/utils/fetcher";

export default async (id) => {
  const url = `${baseUrl.url}/_campaigns/${id}`;
  return fetcher(url, "DELETE");
};
