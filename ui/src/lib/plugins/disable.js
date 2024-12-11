import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (name) => {
  const url = `${PUBLIC_API_URL}/_plugins/${name}`;
  return fetcher(url, "DELETE");
};
