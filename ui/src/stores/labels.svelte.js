import retrieveLabels from "$lib/labels/retrieve";
import createLabel from "$lib/labels/create";
import deleteLabel from "$lib/labels/delete";

function createLabels() {
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
    retrieve: async (campaign) => {
      loading = true;
      const { data: _data, error: err } = await retrieveLabels(campaign);
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (label, color, campaignId) => {
      const { data: _data, error } = await createLabel(
        label,
        color,
        campaignId
      );
      if (error) throw new Error(error);
      data = [_data, ...data];
      return _data;
    },
    delete: (id) => {
      data = data.filter((label) => label.id !== id);
      deleteLabel(id);
    },
    reset: () => {
      data = [];
      loading = true;
      error = null;
      current = null;
    },
  };
}

export default createLabels();
