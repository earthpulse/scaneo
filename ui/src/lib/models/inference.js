import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";
export default async (model, image) => {
  console.log(model, image);
  const _url = `${baseUrl.api_url}/_models/inference/${model}`;
  const body = { image };
  return fetcher(_url, "POST", body);
};
