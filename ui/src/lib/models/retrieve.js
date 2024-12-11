import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export async function retrieveModels(campaign_id) {
  let url = `${PUBLIC_API_URL}/_models`;
  if (campaign_id) url += `?campaign=${campaign_id}`;
  return fetcher(url);
}

export async function retrieveOneModel(model) {
  const url = `${PUBLIC_API_URL}/_models/${model}`;
  return fetcher(url);
}
