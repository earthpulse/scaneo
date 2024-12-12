import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (campaign) => {
  const url = `${baseUrl.url}/labels/${campaign}`;
  return fetcher(url);
};
