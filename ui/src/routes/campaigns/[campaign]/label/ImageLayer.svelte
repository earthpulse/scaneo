<script>
  import { onDestroy } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { mapStore } from "$stores/map/map.svelte.js";
  import createImages from "$stores/images.svelte.js"

  let {
    options,
    stretch = [0, 3000],
    bands = [4, 3, 2],
    palette = "viridis",
  } = $props();

  let layer = $state(null)
  let images_bbox = $state(null);
  let images_layer = $state(null);

  $effect(async () => {
    const map = mapStore.map;
    
    if (!images_bbox) images_bbox = new L.FeatureGroup();
    else images_bbox.clearLayers();
    map.addLayer(images_bbox);
    
    images_bbox.eachLayer((layer) => {
        if (layer.annotationId === createImages.current.name) images_bbox.removeLayer(layer);
      });
    
      if (map && createImages.current) {
      zoomIntoImage(JSON.parse(await createImages.current.bbox), mapStore.map);
      const url = `${PUBLIC_API_URL}/images/${createImages.current.path}/{z}/{x}/{y}.png?stretch=${stretch}&bands=${bands}&palette=${palette}`;
      if (layer) {
        layer.setUrl(url);
      } else {
        layer = L.tileLayer(url, options).addTo(map);
      }
    }

    createImages.data.forEach(async (image) => { 
      addBbox(JSON.parse(await image.bbox), image)
    });
  });

  const drawImage = (map, image) => {
    let layer = null
    if (map && image) {
      console.log(image)
      const url = `${PUBLIC_API_URL}/images/${image}/{z}/{x}/{y}.png?stretch=${stretch}&bands=${bands}&palette=${palette}`;
      if (layer) {
        layer.setUrl(url);
      } else {
        layer = L.tileLayer(url, options);
        images_layer.addLayer(layer)
      }
    }
  };

  const addBbox = (bbox, image) => {
      const image_bbox = L.rectangle(
        [
          [bbox[1], bbox[0]],[bbox[3], bbox[2]]
        ],
        {
          interactive: true,
        }
      )
      image_bbox.annotationId =  image.path;
      images_bbox.addLayer(image_bbox)
      

      
  }

  const zoomIntoImage = (image, map) => {
    if (image) {
      const c1 = L.latLng(image[1], image[0]);
      const c2 = L.latLng(image[3], image[2]);

      const bounds = L.latLngBounds(c1, c2);
      map.fitBounds(bounds);
      
    }
  };
</script>