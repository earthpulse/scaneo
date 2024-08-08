## Installation

You can install the library and CLI using pip.

```py
pip install scaneo
```

To verify the installation you can run the `help` command, which will give you a list of all the available commands in the CLI.

```py
scaneo --help
```

Until we hit a stable release it is recommended to upgrade the cli regularly to get the latest changes.

```py
pip install eotdl --upgrade
```

> The library and CLI require Python >= 3.8.

## CLI

```py
pip install scaneo
```

You can pick a port to run the server on with the flag `--port` or `-p`.

```py
scaneo --port 8080
```

Find out which version of the CLI you are running with the flag `--version` or `-v`.

```py
scaneo --version
```

## Loading datasets

If you're working with local data, you can specify a path to a local file with the flag `--data` or `-d` before the path to the data.

```py
scaneo --data ./path-to-data/
```

Youy may add a path to an environment file with credentials to a cloud bucket with the flag `--env`, `.env` or `-e`.

```py
scaneo --env
```

```py title=".env"
URL=''
ACCESS_KEY=''
SECRET_KEY=''
REGION=''
BUCKET=''
```
