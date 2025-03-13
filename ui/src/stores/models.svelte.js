import { retrieveModels, retrieveOneModel } from "$lib/models/retrieve";
import createModel from "$lib/models/create";
import deleteModel from "$lib/models/delete";
import inference from "$lib/models/inference";
function createModels() {
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
    retrieve: async (campaign_id = null) => {
      loading = true;
      const { data: _data, error: err } = await retrieveModels(campaign_id);
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (
      name,
      description,
      localPath,
      task,
      preprocessing,
      postprocessing
    ) => {
      const { data: _data, error } = await createModel(
        name,
        description,
        localPath,
        task,
        preprocessing,
        postprocessing
      );
      if (error) throw error;
      data = [_data, ...data];
      return _data;
    },
    delete: async (id) => {
      const { data: _data, error } = await deleteModel(id);
      if (error) console.error(error);
      data = data.filter((d) => d.id !== id);
    },
    retrieveOne: async (model) => {
      const { data: _data, error: err } = await retrieveOneModel(model);
      if (err) console.error(error);
      current = _data;
    },
    setCurrent: async (model) => {
      current = model;
    },
    inference: async (model, image_id) => {
      const { data: _data, error: err } = await inference(model, image_id);
      if (err) throw new Error(err);
      return _data;
    },
  };
}

export default createModels();
