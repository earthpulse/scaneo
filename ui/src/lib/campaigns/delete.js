import baseUrl from "$stores/baseUrl.svelte.js";
import { fetcher } from "$lib/utils/fetcher";

export default async (id) => {
  const url = `${baseUrl.api_url}/_campaigns/${id}`;
  return fetcher(url, "DELETE");
};
