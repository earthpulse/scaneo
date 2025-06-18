## Installation

You can install the library and CLI using [uv](https://docs.astral.sh/uv/).

```
uv init
uv add scaneo
```

To verify the installation you can run the `help` command, which will give you a list of all the available commands in the CLI.

```
uv run scaneo --help
```

Until we hit a stable release it is recommended to upgrade the cli regularly to get the latest changes.

```
uv add scaneo --upgrade
```

## The CLI

Start SCANEO with the `scaneo` command.

```
uv run scaneo
```

You can now visit [localhost:8000](http://localhost:8000/) to see the UI.

You can pick a host and/or port to run the server on with the flag `--host` or `-h` and `--port` or `-p`.

```
scaneo --host 0.0.0.0 --port 8000
```

Find out which version of the CLI you are running with the flag `--version` or `-v`.

```
scaneo --version
```

## The UI

Once you open the UI, you will be presented with a simple landing page.

![Landing Page](/img/ui.png)

