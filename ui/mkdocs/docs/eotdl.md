SCANEO offers thrid party integrations via Plugins. 

## EOTDL

> This integration is experimental and in active development, expect bugs and missing features. Help us improve it by [contributing](contributing.md).

The [EOTDL](https://eotdl.com) is a repository of training datasets and ML models. SCANEO offers a plugin to import datasets from EOTDL and export annotations directly to EOTDL.

> We are working on leveraging models hosted in EOTDL to assist you in the labelling process.

First, enable the EOTDL plugin in the Plugins page.

![plugins](/img/plugins.png)

Now, when you create a new campaign, you will see the EOTDL option in the storage section. Choose it and select the dataset you want to import.

![eotdl_create](/img/create_eotdl.png)

The rest of features apply as usual. This means that only `.tif` images in the dataset will be imported.

When exporting annotations, you will be able to choose between exporting to a local folder or directly to EOTDL.

> You will need to install the eotdl and login in order to use this plugin `uv add eotdl` and `uv run eotdl auth login`.

## Other integrations

If you want to integrate SCANEO with other platforms, you can create a plugin for it. Learn more in the [Contributing](contributing.md) section.