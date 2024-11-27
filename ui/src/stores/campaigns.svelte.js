import {
  retrieveCampaigns,
  retrieveOneCampaign,
} from "$lib/campaigns/retrieve";
// import createCampaign from "$lib/campaigns/create";
import deleteCampaign from "$lib/campaigns/delete";

import { PUBLIC_API_URL } from "$env/static/public";

function createCampaigns() {
  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let current = $state(null);
  let progress = $state(0);
  let message = $state("");
  let ws = $state(null);
  let creating = $state(false);
  let completed = $state(false);

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
    get progress() {
      return progress;
    },
    get message() {
      return message;
    },
    get creating() {
      return creating;
    },
    get completed() {
      return completed;
    },
    reset: () => {
      progress = 0;
      message = "";
      creating = false;
      completed = false;
    },
    retrieve: async () => {
      loading = true;
      const { data: _data, error: err } = await retrieveCampaigns();
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (name, description, path) => {
      // const { data: _data, error } = await createCampaign(
      //   name,
      //   description,
      //   localPath
      // );
      // if (error) throw error;
      // data = [_data, ...data];
      // return _data;

      ws = new WebSocket(
        `${PUBLIC_API_URL.replace("https://", "ws://")}/campaigns/create`
      );

      ws.onmessage = (event) => {
        const _data = JSON.parse(event.data);
        if (_data.status === "processing") {
          // console.log("processing");
          // console.log(data.progress);
          progress = parseFloat(_data.progress);
          message = _data.message;
          creating = true;
        } else if (_data.status === "complete") {
          console.log("complete");
          console.log(_data.data);
          data = [_data.data, ...data];
          progress = 1;
          message = "Campaign created";
          creating = false;
          completed = true;
        } else if (_data.status === "error") {
          console.log("error");
          console.log(_data.error);
          progress = 1;
          message = "Error creating campaign";
          creating = false;
          completed = false;
          alert(_data.error);
        }
      };

      // Send campaign data
      ws.onopen = () => {
        progress = 0;
        message = "Creating campaign...";
        creating = true;
        completed = false;
        ws.send(
          JSON.stringify({
            name,
            description,
            path,
          })
        );
      };
    },
    cancel: () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
        message = "Cancelled";
        progress = 0;
        creating = false;
        completed = false;
      }
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
