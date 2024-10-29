import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export default async (imageId) => {
  const url = `${PUBLIC_API_URL}/annotations/${imageId}`;
  return fetcher(url);
};
