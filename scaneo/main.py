import typer
import os
import sys
from pathlib import Path

# Add the cli directory to the Python path
scaneo_cli_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(scaneo_cli_dir))

app = typer.Typer()


__version__ = "2024.08.08-6"


@app.command()
def run(
    port: int = typer.Option(8000, "--port", "-p", help="Port to run the server on"),
    reload: bool = typer.Option(
        False, "--reload", "-r", help="Reload the server when files change", hidden=True
    ),
    host: str = typer.Option(
        "localhost", "--host", "-h", help="Host to run the server on"
    ),
    data: Path = typer.Option(None, "--data", "-d", help="Path to data directory"),
    # image: Path = typer.Option(
    #     "vector", "--image", "-i", help="Save masks as vector or raster"
    # ),
    env: Path = typer.Option(
        ".env",
        "--env",
        "-e",
        help="Path to environment file with credentials to cloud bucket: URL, ACCESS_KEY, SECRET_KEY, BUCKET, REGION",
    ),
    version: bool = typer.Option(
        False, "--version", "-v", help="Print the version and exit"
    ),
    eotdl: str = typer.Option(None, "--eotdl", help="Name of dataset in EOTDL to use"),
):
    if version:
        typer.echo(f"Scaneo version {__version__}")
        return
    # we run the cli from some directory, but run the api from the directory where this file is
    # operation done by the api will have the same working directory as the one from which the cli is run
    # pass environment variable to the api before the command, parse in api settings object
    cmd = f"uvicorn api:app --port {port} --host {host} {'--reload' if reload else ''} --app-dir {os.path.dirname(os.path.realpath(__file__))}"
    if eotdl:
        typer.echo(f"Using EOTDL dataset: {eotdl} (ignoring `data` and `env` flags)")
        cmd = f"EOTDL={eotdl} {cmd}"
        #cmd = f"EOTDL={eotdl} {cmd}"
        os.environ["EOTDL"] = eotdl
    else:
        if env.exists() and data is None:
            cmd += f" --env-file {env}"
        else:
            if env.exists():
                typer.echo(f"Environment file {env} found, but using `data` instead.")
            else:
                typer.echo(f"Environment file {env} not found.")
            if not data:
                raise typer.Exit(
                    "Data directory not specified. Either specify a data directory, an environment file with credentials to a cloud bucket or an EOTDL dataset."
                )
            cmd = f"DATA={data} {cmd}"
            #cmd = f"DATA={data} {cmd}"
            os.environ["DATA"] = str(data)
    # cmd = f"IMAGE={image} " + cmd
    typer.echo(f"Running command: {cmd}")
    os.system(cmd)


if __name__ == "__main__":
    app()
