import retrieveCampaigns from "$lib/campaigns/retrieve";
import createCampaign from "$lib/campaigns/create";

function createCampaigns() {
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
      const { data: _data, error: err } = await retrieveCampaigns();
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (name, description) => {
      const { data: _data, error } = await createCampaign(name, description);
      if (error) throw error;
      data = [_data, ...data];
    },
  };
}

export default createCampaigns();
