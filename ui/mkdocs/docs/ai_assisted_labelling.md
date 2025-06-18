In order to accelerate the labelling process, SCANEO offers the possibility to use AI models to assist you.

You can create and manage your models in the models section.

![model](/img/models.png)

## Create a model

Create a new model by clicking on the `+` button. You will be presented with a form to fill in the details of the model (name, description, etc.).

![new_model](/img/new_model.png)

You will need a public URL where the model is hosted. SCANEO will send the image to the model by performing a POST request to the URL with the following payload:

```json
{
  "image": "image",
}
```

Select the task you want to use the model for (classification, detection or segmentation).

> SAM task is experimental.

Depending on the task, the expected response is different.

- Classification: list of logits/probabilities for each label.
- Detection: list of bounding boxes and labels.
- Segmentation: image mask with the class encoded in each pixel.

If the API does not conform to this specification, the AI assisted labelling will not work.

We also provide common pre- and post-processing functionality to use the model.

> You can find an example of inference API and models at [Github](https://github.com/earthpulse/scaneo) repository.

## Add a model to a campaign

Once a model is created, you have to add it to a campaign. Visit the manage campaign page and add the model at the bottom.

![select_model](/img/select_model.png)

Make sure to map your labels to the model's outputs:

- Classification: position of the label in the list of logits/probabilities.
- Detection: position of the label in the list of logist/probabilities of each bounding box.
- Segmentation: class of the label in the mask.

> You may have defined labels: `water` and `urban` in your campaing. But the model may be trained with `forest` (class 0), `urban` (class 1) and `water` (class 2). In this case, you would have to map `water` to class 2 and `urban` to class 1. If you have a label that the model does not provide, leave the value blank in the label mapper.

## AI assisted labelling

Now that you have a model added to a campaign, you can use it to assist you in the labelling process.

![assisted_labelling](/img/assisted.png)

Select the model you want to use for the assisted labelling and click on the `Run model inference` button. If everything is set up correctly, the model will run and you will see the results in the map. The provided predictions will be automatically added to the image as annotations. You can now edit the annotations as you wish.

## Activle Learning

Active learning is a machine learning technique that iteratively selects the most informative samples for annotation to improve model performance while minimizing the amount of labeled data needed. SCANEO helps you implement active learning by:

1. **Model Training**: After you've labeled some images, you can export the annotations and use them to train your model. The model will learn from your annotations and improve its predictions.

2. **Uncertainty Sampling**: When you run model inference on new images, SCANEO will highlight areas where the model is uncertain about its predictions. These are the areas that would be most beneficial to label next.

3. **Iterative Improvement**: By focusing your labeling efforts on uncertain areas, you can improve your model's performance more efficiently than by randomly selecting images to label.

To use active learning in SCANEO:

1. Label some initial images
2. Export the annotations
3. Train your model with the exported data
4. Add the trained model to your campaign
5. Run inference on new images
6. Focus your labeling efforts on the uncertain areas (missing or incorrect predictions)
7. Repeat the process

This iterative approach helps you build a high-quality training dataset and baseline models while minimizing the time spent on labeling.
