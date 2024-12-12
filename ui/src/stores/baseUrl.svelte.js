function createBaseUrl() {
  let url = $state(null);

  return {
    set url(value) {
      url = value;
    },
    get url() {
      return url;
    },
  };
}

export default createBaseUrl();
