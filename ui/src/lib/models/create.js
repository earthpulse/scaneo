import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (
  name,
  description,
  url,
  task,
  preprocessing,
  postprocessing
) => {
  const _url = `${PUBLIC_API_URL}/_models`;
  const body = { name, description, url, task, preprocessing, postprocessing };
  return fetcher(_url, "POST", body);
};
