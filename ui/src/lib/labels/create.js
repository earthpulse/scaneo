import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (name, campaign) => {
  const _url = `${PUBLIC_API_URL}/labels`;
  const body = { name, campaign };
  return fetcher(_url, "POST", body);
};
