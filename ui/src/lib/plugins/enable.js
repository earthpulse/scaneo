import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (name) => {
  const _url = `${PUBLIC_API_URL}/_plugins`;
  const body = { name };
  return fetcher(_url, "POST", body);
};
