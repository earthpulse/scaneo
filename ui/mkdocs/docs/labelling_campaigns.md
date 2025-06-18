You can create and manage your labelling campaigns by navigating to the 'Campaigns' tab.

![Campaigns](/img/campaigns.png)

## Creating a new campaign

You can create a new campaign by clicking the 'New Campaign' button.

![New Campaign](/img/new_campaign.png)

You will be presented with a form to fill in the details of your campaign (name, description, etc.).

When choosing a local storage, you have to provide a path to a directory in your computer where the campaign will be stored. Path can be absolute or relative to the directory where you launched SCANEO.

> Cloud (S3) storage is not supported yet.

You can also define some labels already, with a name and a color. But you can do this later as well.

Click on 'Create Campaign' to create the campaign. SCANEO will look for all `.tif` files in the provided path and create a campaign with them.

> SCANEO only supports `.tif` files for now, if your images have `.tiff` or other extensions, they will be ignored.

## Manage a campaign

You can edit and delete a campaing by clicking on the corresponding button.

> If you delete a campaign, all the annotations will be lost.

## Labelling a campaign

You can start labelling a campaign by clicking on the `label` button. Learn about the labelling interface in the [Labelling Interface](labelling_interface.md) section.

## Exporting a campaign

You can export all the annotations of a campaign by clicking on the `export` button. Learn more in the [Exporting](exporting.md) section.

## Importing existing annotations

It is actually possible to create a campaign from existing annotations. Learn more in the [Exporting](exporting.md) section.