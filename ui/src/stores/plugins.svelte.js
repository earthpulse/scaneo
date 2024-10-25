import retrievePlugins from "$lib/plugins/retrieve";
import enablePlugin from "$lib/plugins/enable";
import disablePlugin from "$lib/plugins/disable";

function createModels() {
  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);
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
    retrieve: async () => {
      loading = true;
      const { data: _data, error: err } = await retrievePlugins();
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    enable: async (name) => {
      const { data: _data, error } = await enablePlugin(name);
      if (error) throw error;
      data = data.map((d) => (d.name === name ? _data : d));
    },
    disable: async (name) => {
      const { data: _data, error } = await disablePlugin(name);
      if (error) console.error(error);
      data = data.map((d) => (d.name === name ? _data : d));
    },
  };
}

export default createModels();
