import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export async function retrieveCampaigns() {
  const url = `${baseUrl.api_url}/_campaigns`;
  return fetcher(url);
}

export async function retrieveOneCampaign(campaign) {
  const url = `${baseUrl.api_url}/_campaigns/${campaign}`;
  return fetcher(url);
}
