import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export async function updateDetectionAnnotation(annotationId, bb) {
  const url = `${PUBLIC_API_URL}/annotations/detection/${annotationId}`;
  return fetcher(url, "PUT", { bb });
}
