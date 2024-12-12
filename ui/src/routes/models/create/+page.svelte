<script>
  import models from "$stores/models.svelte.js";
  import { goto } from "$app/navigation";
  import baseUrl from "$stores/baseUrl.svelte.js";

  let name = $state("");
  let description = $state("");
  let url = $state("");
  let task = $state("segmentation");
  let preprocessing = $state({ S2RGB: false });
  let postprocessing = $state({ Sigmoid: false });

  const createModel = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      try {
        const data = await models.create(
          name,
          description,
          url,
          task,
          Object.entries(preprocessing)
            .filter(([k, v]) => v)
            .map(([k]) => k),
          Object.entries(postprocessing)
            .filter(([k, v]) => v)
            .map(([k]) => k)
        );
        goto(`${baseUrl.url}/models/model?id=${data.id}`);
      } catch (error) {
        alert(error);
      }
    }
  };
</script>

<div class="max-w-2xl mx-auto p-6 w-full">
  <h1 class="text-3xl font-bold mb-6">Create a new model</h1>
  <form class="flex flex-col gap-4" onsubmit={createModel}>
    <div class="form-control">
      <label for="model-name" class="label font-medium mb-1">Model Name</label>
      <input
        id="model-name"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={name}
        placeholder="Enter model name"
      />
    </div>

    <div class="form-control">
      <label for="model-description" class="label font-medium mb-1"
        >Model Description</label
      >
      <input
        id="model-description"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={description}
        placeholder="Enter model description"
      />
    </div>

    <div class="form-control">
      <label for="model-url" class="label font-medium mb-1">Model URL</label>
      <input
        id="model-url"
        required
        type="text"
        class="input input-bordered w-full"
        bind:value={url}
        placeholder="Enter model URL"
      />
    </div>

    <div class="form-control">
      <label class="label font-medium mb-1">Task</label>
      <div class="flex gap-4">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="classification"
            disabled
            bind:group={task}
          />
          <span class="ml-2">Classification</span>
        </label>
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="detection"
            disabled
            bind:group={task}
          />
          <span class="ml-2">Detection</span>
        </label>
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="task"
            class="radio radio-primary"
            value="segmentation"
            bind:group={task}
          />
          <span class="ml-2">Segmentation</span>
        </label>
      </div>
    </div>

    <div class="form-control">
      <label class="preprocessing font-medium mb-1">Preprocessing options</label
      >
      <div class="flex flex-col gap-4">
        <label class="preprocessing cursor-pointer">
          <input
            type="checkbox"
            name="preprocessing"
            class="checkbox checkbox-primary"
            value="S2RGB"
            bind:checked={preprocessing.S2RGB}
          />
          <span class="ml-2">S2RGB</span>
          <p class="text-sm text-gray-600 ml-8">
            Converts Sentinel-2 bands 4,3,2 to RGB by scaling values between
            0-3000 to 0-255
          </p>
        </label>
      </div>
    </div>

    <div class="form-control">
      <label class="postprocessing font-medium mb-1"
        >Postprocessing options</label
      >
      <div class="flex flex-col gap-4">
        <label class="postprocessing cursor-pointer">
          <input
            type="checkbox"
            name="postprocessing"
            class="checkbox checkbox-primary"
            value="Sigmoid"
            bind:checked={postprocessing.Sigmoid}
          />
          <span class="ml-2">Sigmoid</span>
          <p class="text-sm text-gray-600 ml-8">
            Applies sigmoid function to model output and thresholds at 0.5 to
            create binary mask
          </p>
        </label>
      </div>
    </div>

    <p>
      When you perform inference, the backend will perform a POST request to the
      model URL with the image as a multipart/form-data request, using the name
      "image" for the form data field. You can use the preprocessing and
      postprocessing options to preprocess and postprocess the image before and
      after inference (limited to simple, common operations).
    </p>

    <button
      class="btn btn-primary mt-4 w-full md:w-auto md:self-end"
      type="submit"
    >
      Create Model
    </button>
  </form>
</div>
