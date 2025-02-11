import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (campaign) => {
  const url = `${PUBLIC_API_URL}/labels/${campaign}`;
  return fetcher(url);
};
