function createSettings() {
  let showImageBBs = $state(null);

  return {
    set showImageBBs(value) {
      showImageBBs = value;
      localStorage.setItem("showImageBBs", value);
    },
    get showImageBBs() {
      return showImageBBs;
    },
    init: () => {
      showImageBBs = localStorage.getItem("showImageBBs") === "true";
    },
  };
}

export default createSettings();
