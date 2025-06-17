function createSettings() {
  let showImageBBs = $state(null);
  let rgb = $state([4, 3, 2]);
  let stretch = $state([0, 4000]);

  return {
    set showImageBBs(value) {
      showImageBBs = value;
      localStorage.setItem("showImageBBs", value);
    },
    get showImageBBs() {
      return showImageBBs;
    },
    set rgb(value) {
      rgb = value;
      localStorage.setItem("rgb", value);
    },
    get rgb() {
      return rgb;
    },
    set stretch(value) {
      stretch = value;
      localStorage.setItem("stretch", value);
    },
    get stretch() {
      return stretch;
    },
    init: () => {
      showImageBBs = localStorage.getItem("showImageBBs") === "true";
      rgb = localStorage.getItem("rgb")
        ? localStorage.getItem("rgb").split(",").map(Number)
        : [4, 3, 2];
      stretch = localStorage.getItem("stretch")
        ? localStorage.getItem("stretch").split(",").map(Number)
        : [0, 4000];
    },
  };
}

export default createSettings();
