<script>
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  import MapMarker from "svelte-material-icons/MapMarker.svelte";
  import SquareEditOutline from "svelte-material-icons/SquareEditOutline.svelte";
  import VectorPolygon from "svelte-material-icons/VectorPolygon.svelte";
  import DrawBoxes from "./DrawBoxes.svelte";
  import images from "$stores/images.svelte.js";
  import labels from "$stores/labels.svelte.js";
  import annotations from "$stores/annotations.svelte.js";
  import DrawBrush from "./DrawBrush.svelte";
  import EyeOutline from "svelte-material-icons/EyeOutline.svelte";
  import drawBrush from "$stores/map/drawBrush.svelte.js";
  import drawBoxes from "$stores/map/drawBoxes.svelte.js";
  import drawPoints from "$stores/map/drawPoints.svelte.js";
  import { mapStore } from "$stores/map/map.svelte.js";
  import models from "$stores/models.svelte.js";
  import DrawPoints from "./DrawPoints.svelte";
  import Divider from "./Divider.svelte"; 
  let task = $state(null);

  const validate = () => {
    if (!images.current) return alert("Select image");
    if (!labels.current) return alert("Select label");
    return true;
  };

  const classification = async () => {
    if (!validate()) return;
    task = "classification";
    try {
      await annotations.createClassification(labels.current, images.current.id);
    } catch (error) {
      console.error(error);
    }
  };

  const points = async () => {
    if (!validate()) return;
    task = "points";
  };

  const detection = () => {
    if (!validate()) return;
    task = "detection";
  };

  const segmentation = () => {
    if (!validate()) return;
    task = "segmentation";
  };

  const showAll = async () => {
    task = null;
    const data = await annotations.retrieve(images.current.id);
    drawBoxes.initItems(mapStore.map);
    drawBrush.initItems(mapStore.map);
    drawPoints.initItems(mapStore.map);
    data?.forEach((annotation) => {
      if (annotation.type === "detection") drawBoxes.addLayer(annotation);
      if (annotation.type === "segmentation") drawBrush.addLayer(annotation);
      if (annotation.type === "points") drawPoints.addLayer(annotation);
    });
  };
</script>

<button
class="btn {task === 'classification'
    ? 'btn-primary'
    : 'btn-outline'} btn-sm tooltip tooltip-right flex items-center p-2"
  data-tip="Classification"
  onclick={classification}
  >
  <MapMarkerOutline size="15" />
</button>
<button
class="btn {task === 'detection'
    ? 'btn-primary'
    : 'btn-outline'} btn-sm tooltip flex items-center p-2"
  data-tip="Detection"
  onclick={detection}
  >
  <SquareEditOutline size="15" />
</button>
<button
class="btn {task === 'segmentation'
    ? 'btn-primary'
    : 'btn-outline'} btn-sm tooltip flex items-center p-2"
  data-tip="Segmentation"
  onclick={segmentation}
  >
  <VectorPolygon size="15" />
</button>
<button
class="btn {task === null
    ? 'btn-primary'
    : 'btn-outline'} btn-sm tooltip flex items-center p-2"
  data-tip="See all annotations"
  onclick={showAll}
  >
  <EyeOutline size="15" />
</button>
<Divider />
{#if models.current?.task == "SAM"}
  <button
  class="btn {task === 'points'
    ? 'btn-primary'
    : 'btn-outline'} btn-sm tooltip tooltip-right flex items-center p-2"
  data-tip="Points"
  onclick={points}
  >
    <MapMarker size="15" />
  </button>
{/if}

{#if task === "detection"}
<DrawBoxes />
{/if}
{#if task === "segmentation"}
<DrawBrush />
{/if}
{#if task === "points"}
<DrawPoints />
{/if}
