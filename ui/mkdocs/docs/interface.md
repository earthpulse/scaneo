## Label Selector

Engage with existing labels and create new ones with associated colors.

If you're working with spare data, you can create labels by selecting a color, adding a name and clicking the '+' button or hitting the ++enter++ key.
Labels and colors will be stored in a `labels.json` file at the root of your data directory.

If you're working with a STAC catalog that uses the [label extension](https://github.com/stac-extensions/label), the tool will automatically import all the labels from the catalog and assign them a color. Feel free to change the color of the labels to your liking.

The colors of the labels of a STAC catalog will be stored in the label collection, under the 'summaries' property with the key 'scaneo:colors'.

<div class="video-wrapper">
    			<iframe
				width="100%"
				height="100%"
				title="Label Selector Video"
				src=../../img/label-selector.webm
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
</div>

## Image Selector

You may click on an image name to begin labelling.
There's a field to filter the images by name.

<div class="video-wrapper">
    			<iframe
				width="100%"
				height="100%"
				title="Image Selector Video"
				src=../../img/image-selector.webm
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
</div>

## Options

Configure image band specifications, define selection ranges, and adjust the opacity of highlighted areas.

These options are specific for your browser, as they're stored in Local storage.

<div class="video-wrapper">
    			<iframe
				width="100%"
				height="100%"
				title="Options Video"
				src=../../img/options.webm
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
</div>

## Quick Selection

Shift between images swiftly with a comprehensive boundary view.
You may start labelling an image by clicking on their boundaries or by using the search function.

It has two zoom options:

- Zoom out on Quick Selection: Upon selecting this tool, the Quick Selection will zoom out to display all images.
- Zoom in on selecting image: Upon selecting an image, the tool will zoom in to display the selected image.

<div class="video-wrapper">
    			<iframe
				width='748px'
				height='467px'
				title="Quick Selection Video"
				src=../../img/quick-selection.webm
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
</div>
