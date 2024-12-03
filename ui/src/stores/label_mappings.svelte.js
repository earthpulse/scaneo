import retrieveLabelMappings from "$lib/labelMappings/retrieve";
import updateLabelMappings from "$lib/labelMappings/update";
function createLabelMappings() {
  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);
  return {
    get data() {
      return data;
    },
    set data(value) {
      data = value;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    retrieve: async (id, from = "campaigns") => {
      loading = true;
      const { data: _data, error: err } = await retrieveLabelMappings(id, from);
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    update: async (campaing_id, data) => {
      const { data: _data, error: err } = await updateLabelMappings(
        campaing_id,
        { data }
      );
      if (err) throw new Error(err);
    },
  };
}

export default createLabelMappings();
