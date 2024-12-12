function createBaseUrl() {
  let url = $state("");
  let api_url = $state("");

  return {
    set url(value) {
      url = value;
    },
    get url() {
      return url;
    },
    set api_url(value) {
      api_url = value;
    },
    get api_url() {
      return api_url;
    },
  };
}

export default createBaseUrl();
