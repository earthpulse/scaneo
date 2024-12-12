import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (campaing_id, data) => {
  console.log("data", data);
  const url = `${baseUrl.url}/campaigns/${campaing_id}/label_mappings`;
  return fetcher(url, "POST", data);
};
