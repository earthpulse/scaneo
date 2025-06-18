<div align="center">

<p align="center">
    <img src="https://github.com/earthpulse/scaneo/blob/main/ui/static/scaneo.png" alt="" style="width: 90%;" />
</p>

Annotate satellite imagery for training AI models.</p>

<p align="center">
    <a href="https://pypi.python.org/pypi/scaneo">
        <img src="https://img.shields.io/pypi/v/scaneo.svg" alt="Pip Version" />
    </a>
</p>

</div>

SCANEO is a labelling tool for annotating satellite images. Its primary goal is to improve the efficiency of the creation of training datasets for AI models. To that end, SCANEO features an intuitive labelling interface and assisted labelling capabilities. Current capabilities include:

- Create labelling campaigns from local or remote data
- Annotate images for classification, detection and segmentation tasks
- Assisted labelling with AI models
- Export annotations in GeoJSON format
- Integration with [EOTDL](https://eotdl.com).

## Why SCANEO?

The development and deployment of AI models for Earth Observation (EO) applications faces significant challenges due to the scarcity of high-quality, well-annotated training datasets. This data bottleneck stems from several factors: the complex nature of satellite imagery, which requires domain expertise for accurate labeling; the high costs associated with data acquisition and manual annotation; and the technical challenges in preprocessing and standardizing multi-source EO data. These limitations have created a substantial gap between the potential applications of AI in Earth Observation and its current implementation, particularly when compared to more mature AI applications in other domains where training data is more readily available and easier to process.

To address some of these challenges, SCANEO provides a web-based annotation platform that combines artificial intelligence and active learning techniques to accelerate the creation of training datasets from satellite imagery.

## Installation

We recommend using [uv](https://docs.astral.sh/uv/) to install SCANEO.

```
uv init
uv add scaneo
```

Is is recommended to upgrade the package regularly, in order to get the latest changes.

```
uv add scaneo --upgrade
```

## Usage

You can launch `scaneo` with a single command:

```
scaneo
```

This will launch the UI, which will be accessible on your [localhost:8000](http://localhost:8000/).

To learn more about the CLI and options, run:

```
scaneo --help
```

## Documentation and tutorials

To view the documentation, launch the UI and go to [localhost:8000/docs](http://localhost:8000/docs/). 

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Development

This repository contains the source code for SCANEO.

- scaneo: includes the CLI and the API.
- ui: includes the web application UI.
- inference: includes a simple inference API.

First, clone the repository and install the dependencies:

```
git clone https://github.com/earthpulse/scaneo.git
cd scaneo
uv sync
```

Run the API with the CLI:

```
make dev
```

Then, run the UI:

```
cd ui
bun run dev
```

> Remember to create the .env file from .env.example
> `cp .env.example .env`

### Build

In the UI, create `.env.production` with an empty `PUBLIC_API_URL`.

Then, build the Python package:

```
make build v=0.1.0
```

> The `v` parameter is the version of the package, change it to the desired version.

### Inference

You can run the sample inference API to test the assisted labelling capabilities. 

First, get the models and samples from EOTDL:

```
uv run eotdl models get SCANEO -p eotdl -a -f
```

Then, move the models and samples to the inference folder:

```
mv eotdl/SCANEO/models inference/models
mv eotdl/SCANEO/samples inference/samples
```

Finally, start the inference API:

```
make inference
```

You can test the models in the [inference notebook](inference/inference.ipynb).

### Notes

Do not add scaneo/ui to gitignore since the build process will fail (missing entry folder).
