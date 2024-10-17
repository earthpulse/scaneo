import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async () => {
  const url = `${PUBLIC_API_URL}/campaigns`;
  return fetcher(url);
};
