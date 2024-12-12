import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export default async (
  name,
  description,
  url,
  task,
  preprocessing,
  postprocessing
) => {
  const _url = `${baseUrl.api_url}/_models`;
  const body = { name, description, url, task, preprocessing, postprocessing };
  return fetcher(_url, "POST", body);
};
