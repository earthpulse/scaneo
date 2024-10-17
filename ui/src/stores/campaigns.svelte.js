import {
  retrieveCampaigns,
  retrieveOneCampaign,
} from "$lib/campaigns/retrieve";
import createCampaign from "$lib/campaigns/create";
import deleteCampaign from "$lib/campaigns/delete";

function createCampaigns() {
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
    retrieve: async () => {
      loading = true;
      const { data: _data, error: err } = await retrieveCampaigns();
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (name, description, localPath) => {
      const { data: _data, error } = await createCampaign(
        name,
        description,
        localPath
      );
      if (error) throw error;
      data = [_data, ...data];
      return _data;
    },
    delete: async (id) => {
      const { data: _data, error } = await deleteCampaign(id);
      if (error) console.error(error);
      data = data.filter((d) => d.id !== id);
    },
    retrieveOne: async (campaign) => {
      const { data: _data, error: err } = await retrieveOneCampaign(campaign);
      if (err) console.error(error);
      current = _data;
    },
  };
}

export default createCampaigns();
