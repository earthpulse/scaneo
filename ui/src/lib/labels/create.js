import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (name, color, campaign) => {
  const _url = `${baseUrl.url}/labels`;
  const body = { name, color, campaign };
  return fetcher(_url, "POST", body);
};
