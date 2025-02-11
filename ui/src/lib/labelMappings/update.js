import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (campaing_id, data) => {
  console.log("data", data);
  const url = `${PUBLIC_API_URL}/campaigns/${campaing_id}/label_mappings`;
  return fetcher(url, "POST", data);
};
