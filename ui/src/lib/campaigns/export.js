import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (campaignId) => {
  const url = `${baseUrl.url}/_campaigns/${campaignId}/export`;
  return fetcher(url, "POST");
};
