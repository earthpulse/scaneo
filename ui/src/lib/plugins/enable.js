import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (name) => {
  const _url = `${baseUrl.url}/_plugins`;
  const body = { name };
  return fetcher(_url, "POST", body);
};
