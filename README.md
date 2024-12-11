<div align="center">

<p align="center">
    <img src="https://github.com/earthpulse/scaneo/blob/main/ui/static/scaneo.png" alt="" style="width: 90%;" />
</p>

Create your own training datasets from satellite imagery, effortlessly and faster than ever.</p>

<p align="center">
    <a href="https://pypi.python.org/pypi/scaneo">
        <img src="https://img.shields.io/pypi/v/scaneo.svg" alt="Pip Version" />
    </a>
</p>

</div>

SCANEO is an AI-powered web tool for smart labeling of satellite data training datasets. It can generate labels on its own, and its model can also be retrained with user-validated labels, creating a feedback loop that increases accuracy and speeds up labeling. In this way, SCANEO benefits both models and data sets simultaneously, and promotes the proliferation of artificial intelligence models applied to Earth observation data.

## Why SCANEO?

The shortage of suitable and accessible training datasets used to train AI models applied to Earth observation data is just one of the many problems faced by users who want to apply artificial intelligence to satellite data. Furthermore, the acquisition and labeling of EO data is complicated and expensive, slowing the advancement of AI in EO and limiting its potential compared to other fields.

This is how SCANEO emerges, a smart labeling web application for training sets with satellite data, powered through artificial intelligence and active learning.

## Installation

[SCANEO](https://pypi.org/project/scaneo/) is simply a Python package that can be installed using pip.

```
pip install scaneo
```

Is is recommended to upgrade the package regularly, in order to get the latest changes.

```
pip install scaneo --upgrade
```

> The library requires Python >= 3.8
>
> For a fast installation, we commend using `uv pip install scaneo`.

## Usage

SCANEO allows to launch the labelling web application through CLI commands. The first thing you can do is run the help command, which will give you a list of all the available commands in the CLI.

```
scaneo --help
```

You can launch `scaneo` with a single command:

```
scaneo
```

This will launch the UI, which will be accessible on your [localhost:8000](http://localhost:8000/).

## Documentation and tutorials

To view the documentation, launch the UI and go to [localhost:8000/docs](http://localhost:8000/docs/). There you will find all the detailed SCANEO documentation, with advanced examples of usage, videos and tutorials.

## Build

This repository contains the source code for SCANEO.

- scaneo: includes the CLI, the library and the API.
- ui: includes the web application UI.

The CLI runs the API, which in turns serves the static files for the UI.

### Development

Run the API with the CLI:

```
python scaneo/main.py run -r
```

Then, run the UI:

```
cd ui
yarn dev
```

> Remember to create the .env file from .env.example
> `cp .env.example .env`

### Production

In the UI, create `.env.production` with an empty `API_URL`.

Build the UI, copy the build inside `scaneo` and build the python package:

Your annoatations will be stored as `GeoJSON` files with the same name of your images, followed by `_labels.geojson`. For example, if you are labeling `image1.tif`, your annotations will be stored in `image1_labels.geojson`. Additionally, a `labels.json` file will be created containing some metadata about your annotations.

> It is needed to install mkdocs with `pip install mkdocs-material`

### Notes

Do not add scaneo/ui to gitignore since the build process will fail (missing entry folder).
