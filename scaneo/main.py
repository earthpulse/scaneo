import typer
import os
from pathlib import Path
import logging

# # Add the cli directory to the Python path
# scaneo_cli_dir = os.path.dirname(os.path.realpath(__file__))
# sys.path.append(os.path.join(scaneo_cli_dir))

app = typer.Typer()

__version__ = "2025.06.23"

logger = logging.getLogger()
logger.setLevel(logging.INFO)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
formatter = logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s")
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)
# Remove other handlers to ensure only console logging
if len(logger.handlers) > 1:
    logger.handlers = [console_handler]

@app.command()
def run(
    port: int = typer.Option(8000, "--port", "-p", help="Port to run the server on"),
    reload: bool = typer.Option(
        False, "--reload", "-r", help="Reload the server when files change", hidden=True
    ),
    host: str = typer.Option(
        "localhost", "--host", "-h", help="Host to run the server on"
    ),
    workers: int = typer.Option(
        None, "--workers", "-w", help="Number of workers to run the server on"
    ),
    version: bool = typer.Option(
        False, "--version", "-v", help="Print the version and exit"
    ),
):
    if version:
        typer.echo(f"Scaneo version {__version__}")
        return
    cmd = f"uvicorn api:app --port {port} --host {host} --app-dir {os.path.dirname(os.path.realpath(__file__))}"
    if workers:
        cmd += f" --workers {workers}"
    if reload:
        cmd += " --reload"
    typer.echo(f"Running command: {cmd}")
    os.system(cmd)


if __name__ == "__main__":
    app()
