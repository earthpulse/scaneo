import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (name, description, url) => {
  const _url = `${PUBLIC_API_URL}/models`;
  const body = { name, description, url };
  return fetcher(_url, "POST", body);
};
