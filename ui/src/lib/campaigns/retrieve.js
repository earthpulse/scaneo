import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export async function retrieveCampaigns() {
  const url = `${baseUrl.url}/_campaigns`;
  return fetcher(url);
}

export async function retrieveOneCampaign(campaign) {
  const url = `${baseUrl.url}/_campaigns/${campaign}`;
  return fetcher(url);
}
