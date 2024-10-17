import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export async function retrieveCampaigns() {
  const url = `${PUBLIC_API_URL}/campaigns`;
  return fetcher(url);
}

export async function retrieveOneCampaign(campaign) {
  const url = `${PUBLIC_API_URL}/campaigns/${campaign}`;
  return fetcher(url);
}
