import retrieveAnnotations from "$lib/annotations/retrieve";
import {
  createClassificationAnnotation,
  createDetectionAnnotation,
} from "$lib/annotations/create";
import deleteAnnotation from "$lib/annotations/delete";

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
    },
    createClassification: async (label, imageId) => {
      const { data: _data, error: err } = await createClassificationAnnotation(
        label,
        imageId
      );
      if (err) throw new Error(err.message);
      data = [_data, ...data];
    },
    createDetection: async (bb, label, imageId) => {
      const { data: _data, error: err } = await createDetectionAnnotation(
        bb,
        label,
        imageId
      );
      console.log("createDetection", _data, err);
      if (err) throw new Error(err.message);
      data = [_data, ...data];
    },
    delete: async (id) => {
      const { error: err } = await deleteAnnotation(id);
      if (err) throw new Error(err.message);
      data = data.filter((annotation) => annotation.id !== id);
    },
  };
}

export default createAnnotations();
