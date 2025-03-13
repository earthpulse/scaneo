import annotations from "$stores/annotations.svelte.js";
import labels from "$stores/labels.svelte.js";
import images from "$stores/images.svelte.js";

function createDrawBoxes() {
  let drawnItems = $state(null);
  let drawControl = $state(null);
  let points = $state([]);
  let drawCreatedHandler;
  let drawDeletedHandler;

    const LabelHasPoints = () => {
      return annotations.data.find((annotation) => {
        return (
          annotation.value == labels.current && annotation.type == "points"
        );
      });
    };
  
    const deleteCallback = async (e) => {
      // e.layers contains all layers being deleted
      let updatedAnnotations = {};
    
      e.layers.eachLayer(layer => {
        // Get coordinates from the layer
        const layerLatLng = [layer.getLatLng().lat, layer.getLatLng().lng];
        
        // Find the point in the points array by comparing coordinates
        const index = points.findIndex(point => 
          point[0] === layerLatLng[0] && point[1] === layerLatLng[1]
        );
        
        if (index > -1) {
          // Remove the point from points array
          points.splice(index, 1);
          
          // Track which annotations need updates
          if (layer.annotationId) {
            updatedAnnotations[layer.annotationId] = true;
          }
        }
      });
      
      // Update each affected annotation only once
      Object.keys(updatedAnnotations).forEach(annotationId => {
        annotations.updatePoints(annotationId, points);
      });
    };

  const deletePointsAnnotation = () => {
        drawnItems.eachLayer((layer) => {
            drawnItems.removeLayer(layer);
        });
        points = [];
  };

  const drawCallback = async (e) => {
    const { layer } = e;
    drawnItems.addLayer(layer);

    if (!LabelHasPoints()){
      points.push([layer.getLatLng().lat, layer.getLatLng().lng])

      const data = await annotations.createPoints(
        points,
        labels.current,
        images.current.id
      );
    }
    else {
      points.push([layer.getLatLng().lat, layer.getLatLng().lng])

      layer.annotationId = annotations.data.find((annotation) => {   
          return (annotation.value == labels.current && annotation.type == "points");
      }).id;
      annotations.updatePoints(layer.annotationId, points)
    }
  };


  const initItems = (map) => {
    if (!drawnItems) drawnItems = new L.FeatureGroup();
    else drawnItems.clearLayers();
    map.addLayer(drawnItems);
  };

  const initControls = (map) => {
    if (!drawnItems) initItems(map);
    if (drawCreatedHandler) map.off(L.Draw.Event.CREATED, drawCreatedHandler);
    if (drawDeletedHandler) map.off(L.Draw.Event.DELETED, drawDeletedHandler);
    if (drawControl) map.removeControl(drawControl);

    drawControl = new L.Control.Draw({
      position: "topright",
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polyline: false,
        circlemarker: false,
        circle: false,
        marker: {
            repeatMode:true,
        },
        rectangle: false,
        polygon: false,
      },
    });

    map.addControl(drawControl);    
    drawCreatedHandler = async (e) => await drawCallback(e);
    drawDeletedHandler = async (e) => await deleteCallback(e);
    map.on(L.Draw.Event.CREATED, drawCreatedHandler);
    map.on(L.Draw.Event.DELETED, drawDeletedHandler);

  };

  return {
    initItems,
    initControls,
    deletePointsAnnotation,
    remove: (map) => {
      if (drawnItems) map?.removeLayer(drawnItems);
      if (drawControl) map?.removeControl(drawControl);
      
      if (drawDeletedHandler) map.off(L.Draw.Event.DELETED, drawDeletedHandler);
      if (drawCreatedHandler) map.off(L.Draw.Event.CREATED, drawCreatedHandler);
      drawnItems = null;
      drawControl = null;
      points = [];

    },
    addLayer: (annotation) => {
      const points = annotation.points;
      points.forEach(point => {        
        const layer = L.marker(point);
        // .on("click", () => {
        //   console.log("rectanle", layer.annotationId);
        // });
        layer.annotationId = annotation.id;
        drawnItems.addLayer(layer);
      });
    },
  };
}

export default createDrawBoxes();

