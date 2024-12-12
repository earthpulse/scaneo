import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (campaing_id, data) => {
  const url = `${baseUrl.api_url}/_campaigns/${campaing_id}/label_mappings`;
  return fetcher(url, "POST", data);
};
