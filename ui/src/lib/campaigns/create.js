import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (name, description, path) => {
  const url = `${baseUrl.url}/_campaigns`;
  const body = { name, description, path };
  return fetcher(url, "POST", body);
};
