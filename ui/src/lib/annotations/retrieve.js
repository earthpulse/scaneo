import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (imageId) => {
  const url = `${baseUrl.url}/annotations/${imageId}`;
  return fetcher(url);
};
