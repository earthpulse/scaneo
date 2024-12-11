import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (campaignId) => {
  const url = `${PUBLIC_API_URL}/geojson/save`;
  return fetcher(url, "POST", {campaignId});
}
