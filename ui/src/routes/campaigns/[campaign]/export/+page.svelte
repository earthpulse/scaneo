<script>
    import { page } from "$app/stores";
    import annotations from "$stores/annotations.svelte.js";
    import images from "$stores/images.svelte.js";
    import campaigns from "$stores/campaigns.svelte.js";
    let path = $state("")
    let geojson = $state(null)
    let featureCollection = $state({
            type: "FeatureCollection",
            features: []
          });
    $effect(async ()=>{
      await campaigns.retrieveOne($page.params.campaign);
      await images.retrieve(campaigns.current?.id)
    })
    const buildGeoJSON = async () => {
      images.data.
      forEach(async (image)=>{
        let current_annotations = await annotations.retrieve(image.id)
        console.log(current_annotations)
        current_annotations.
        forEach((annotation) => 
        {
          if (annotation.bb) {

          }
          else if (annotation.layer_data) {
            annotation.layer_data.properties = {
              labels:[annotation.value],
              tasks:["segmentation"]
            }
            featureCollection.features.push(annotation.layer_data)
          }
        })
      })
    }
</script>
<div class="w-full max-w-2xl p-6 mx-auto">
  <form class="flex flex-col gap-4">
    <div class="form-control">
        <button
        class="mt-4 btn btn-outline"
        type="button"
        onclick={() => (annotations.save(campaigns.current.id))}>Export campaign</button
      >
    </div>
    </form>
</div>