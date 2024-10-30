import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (id) => {
  const url = `${PUBLIC_API_URL}/models/${id}`;
  return fetcher(url, "DELETE");
};