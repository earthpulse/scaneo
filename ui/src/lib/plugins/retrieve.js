import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async function retrievePlugins() {
  const url = `${PUBLIC_API_URL}/plugins`;
  return fetcher(url);
}
