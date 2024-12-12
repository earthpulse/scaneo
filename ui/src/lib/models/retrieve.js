import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export async function retrieveModels(campaign_id) {
  let url = `${baseUrl.api_url}/_models`;
  if (campaign_id) url += `?campaign=${campaign_id}`;
  return fetcher(url);
}

export async function retrieveOneModel(model) {
  const url = `${baseUrl.api_url}/_models/${model}`;
  return fetcher(url);
}
