import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";
export async function updateDetectionAnnotation(annotationId, bb) {
  const url = `${baseUrl.api_url}/annotations/detection/${annotationId}`;
  return fetcher(url, "PUT", { bb });
}
