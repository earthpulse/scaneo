import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (model, image) => {
  console.log(model, image);
  const _url = `${PUBLIC_API_URL}/_models/inference/${model}`;
  const body = { image };
  return fetcher(_url, "POST", body);
};
