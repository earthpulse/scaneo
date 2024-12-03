import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (id, from = "campaigns") => {
  const url = `${PUBLIC_API_URL}/${from}/${id}/label_mappings`;
  return fetcher(url);
};
