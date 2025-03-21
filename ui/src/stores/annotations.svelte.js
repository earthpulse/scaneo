import retrieveAnnotations from "$lib/annotations/retrieve";
import {
  createClassificationAnnotation,
  createDetectionAnnotation,
  createSegmentationAnnotation,
  createPointsAnnotation,
} from "$lib/annotations/create";
import deleteAnnotation from "$lib/annotations/delete";
import { updateDetectionAnnotation, updatePointsAnnotation } from "$lib/annotations/update";

function createAnnotations() {
  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let current = $state(null);
  return {
    get data() {
      return data;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get current() {
      return current;
    },
    set current(value) {
      current = value;
    },
    retrieve: async (imageId) => {
      loading = true;
      const { data: _data, error: err } = await retrieveAnnotations(imageId);
      if (err) error = err.message;
      data = _data;
      loading = false;
      return _data;
    },
    createClassification: async (label, imageId) => {
      const { data: _data, error: err } = await createClassificationAnnotation(
        label,
        imageId
      );
      if (err) throw new Error(err.message);
      if (!data.find((a) => a.id === _data.id)) {
        data = [_data, ...data];
      } else {
        data = data.map((a) => (a.id === _data.id ? _data : a));
      }
    },
    createDetection: async (bb, label, imageId) => {
      const { data: _data, error: err } = await createDetectionAnnotation(
        bb,
        label,
        imageId
      );
      if (err) throw new Error(err.message);
      data = [_data, ...data];
      return _data;
    },
    updateDetection: async (id, bb) => {
      const { data: _data, error: err } = await updateDetectionAnnotation(
        id,
        bb
      );
      if (err) throw new Error(err.message);
      data = data.map((annotation) =>
        annotation.id === id ? { ...annotation, bb } : annotation
      );
    },
    createSegmentation: async (layerData, label, imageId) => {
      const { data: _data, error: err } = await createSegmentationAnnotation(
        layerData,
        label,
        imageId
      );
      if (err) throw new Error(err.message);
      data = [_data, ...data];
      return _data;
    },
    createPoints: async (points, label, imageId) => {
      const { data: _data, error: err } = await createPointsAnnotation(
        points,
        label,
        imageId
      );
      if (err) throw new Error(err.message);
      data = [_data, ...data];
      return _data;
    },
    updatePoints: async (id, points) => {
      const { data: _data, error: err } = await updatePointsAnnotation(
        id,
        points
      );
      if (err) throw new Error(err.message);
      data = data.map((annotation) =>
        annotation.id === id ? { ...annotation, points } : annotation
      );
    },
    delete: async (id) => {
      const { error: err } = await deleteAnnotation(id);
      if (err) throw new Error(err.message);
      data = data.filter((annotation) => annotation.id !== id);
    },
    reset: () => {
      data = [];
      loading = true;
      error = null;
      current = null;
    },
    append: (annotations) => {
      data = [...annotations, ...data];
    },
  };
}

export default createAnnotations();
