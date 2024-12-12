import { fetcher } from "$lib/utils/fetcher";
import baseUrl from "$stores/baseUrl.svelte.js";

export async function createClassificationAnnotation(label, imageId) {
  const url = `${baseUrl.url}/annotations/classification`;
  return fetcher(url, "POST", { label, imageId });
}

export async function createDetectionAnnotation(bb, label, imageId) {
  const url = `${baseUrl.url}/annotations/detection`;
  return fetcher(url, "POST", { bb, label, imageId });
}

export async function createSegmentationAnnotation(layer_data, label, imageId) {
  const url = `${baseUrl.url}/annotations/segmentation`;
  return fetcher(url, "POST", { layer_data, label, imageId });
}
