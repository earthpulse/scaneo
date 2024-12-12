import {
  retrieveCampaigns,
  retrieveOneCampaign,
} from "$lib/campaigns/retrieve";
import deleteCampaign from "$lib/campaigns/delete";
import exportCampaign from "$lib/campaigns/export";
import baseUrl from "$stores/baseUrl.svelte.js";

function createCampaigns() {
  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let current = $state(null);
  let progress = $state(0);
  let message = $state("");
  let ws = $state(null);
  let creating = $state(false);
  let exporting = $state(false);
  let completed = $state(false);

  const createWS = (payload, endpoint) => {
    // ws = new WebSocket(
    //   `${baseUrl.url.replace("https://", "ws://")}/_campaigns/${endpoint}`
    // );
    ws = new WebSocket(`${baseUrl.api_url}/_campaigns/${endpoint}`);
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
    ws.onopen = () => {
      progress = 0;
      message = "Creating campaign...";
      creating = true;
      completed = false;
      ws.send(JSON.stringify(payload));
    };
  };

  const exportWS = (campaignId, payload) => {
    // ws = new WebSocket(
    //   `${baseUrl.url.replace(
    //     "https://",
    //     "ws://"
    //   )}/_campaigns/${campaignId}/export`
    // );
    ws = new WebSocket(`${baseUrl.api_url}/_campaigns/${campaignId}/export`);
    ws.onmessage = (event) => {
      const _data = JSON.parse(event.data);
      if (_data.status === "exporting") {
        // console.log("processing");
        // console.log(data.progress);
        progress = parseFloat(_data.progress);
        message = _data.message;
        exporting = true;
      } else if (_data.status === "complete") {
        console.log("complete");
        progress = 1;
        message = "Campaign exported";
        exporting = false;
        completed = true;
      } else if (_data.status === "error") {
        console.log("error");
        console.log(_data.error);
        progress = 1;
        message = "Error exporting campaign";
        exporting = false;
        completed = false;
        alert(_data.error);
      }
    };
    ws.onopen = () => {
      progress = 0;
      message = "Exporting campaign...";
      exporting = true;
      completed = false;
      ws.send(JSON.stringify(payload));
    };
  };

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
    get exporting() {
      return exporting;
    },
    get completed() {
      return completed;
    },
    reset: () => {
      progress = 0;
      message = "";
      creating = false;
      exporting = false;
      completed = false;
    },
    retrieve: async () => {
      loading = true;
      const { data: _data, error: err } = await retrieveCampaigns();
      if (err) error = err.message;
      data = _data;
      loading = false;
    },
    create: async (name, description, path, labels, labelMappings) => {
      createWS({ name, description, path, labels, labelMappings }, "create");
    },
    createEOTDL: async (
      name,
      description,
      eotdlDatasetId,
      labels,
      labelMappings
    ) => {
      createWS(
        { name, description, eotdlDatasetId, labels, labelMappings },
        "create-eotdl"
      );
    },
    import: async (name, description, path) => {
      createWS({ name, description, path }, "import");
    },
    cancel: () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
        message = "Cancelled";
        progress = 0;
        creating = false;
        exporting = false;
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
    export: async (campaignId, exportType, exportPath) => {
      // const { error: err } = await exportCampaign(campaignId);
      // if (err) throw new Error(err.message);
      exportWS(campaignId, { exportType, exportPath });
    },
  };
}

export default createCampaigns();
