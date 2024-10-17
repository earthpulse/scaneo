import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (name, description, path) => {
  const url = `${PUBLIC_API_URL}/campaigns`;
  const body = { name, description, path };
  return fetcher(url, "POST", body);
};
