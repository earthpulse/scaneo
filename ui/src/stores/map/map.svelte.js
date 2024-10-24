function createMap() {
  let map = $state(null);
  return {
    get map() {
      return map;
    },
    set map(value) {
      map = value;
    },
  };
}

export const mapStore = createMap();
