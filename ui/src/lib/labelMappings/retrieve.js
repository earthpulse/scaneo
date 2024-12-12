import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (id, from = "campaigns") => {
  const url = `${baseUrl.url}/${from}/${id}/label_mappings`;
  return fetcher(url);
};
