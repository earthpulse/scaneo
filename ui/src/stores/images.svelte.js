import retrieveImages from "$lib/images/retrieve";

function createImages() {
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
      const { data: _data, error: err } = await retrieveImages(campaign);
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
  };
}

export default createImages();
