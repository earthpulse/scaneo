import { PUBLIC_API_URL } from "$env/static/public";
import { fetcher } from "$lib/utils/fetcher";

export async function createClassificationAnnotation(label, imageId) {
  const url = `${PUBLIC_API_URL}/annotations/classification`;
  return fetcher(url, "POST", { label, imageId });
}

export async function createDetectionAnnotation(bb, label, imageId) {
  const url = `${PUBLIC_API_URL}/annotations/detection`;
  return fetcher(url, "POST", { bb, label, imageId });
}

export async function createSegmentationAnnotation(layer_data, label, imageId) {
  const url = `${PUBLIC_API_URL}/annotations/segmentation`;
  return fetcher(url, "POST", { layer_data, label, imageId });
}
