import os
import rasterio as rio
import json
import io
import requests


class Storage:
    def __init__(self):
        # if valid environment variables are set, use cloud storage
        url = os.getenv("URL")
        access_key = os.getenv("ACCESS_KEY")
        secret_key = os.getenv("SECRET_KEY")
        bucket = os.getenv("BUCKET")
        eotdl = os.getenv("EOTDL")
        if eotdl:
            from .eotdl import EOTDLStorage

            self.storage = EOTDLStorage(eotdl)
            self.name = "eotdl/" + eotdl
            self.is_stac = False
        elif url and access_key and secret_key and bucket:
            from .cloud import CloudStorage

            self.storage = CloudStorage(
                url,
                access_key,
                secret_key,
                bucket,
                os.getenv("REGION", "us-east-1"),
                os.getenv("PREFIX", None),
            )
            self.name = "cloud/" + url + "/" + bucket
            self.is_stac = self.exists("catalog.json")
        else:
            from .local import LocalStorage

            path = os.getenv("DATA")
            if not path:
                raise Exception("No storage specified.")
            self.storage = LocalStorage(os.getenv("DATA"))
            self.name = "local/" + path
            self.is_stac = self.exists("catalog.json")
        self.name = self.name.replace("/", "_")

    def get_stac_catalog(self) -> dict:
        catalog_file = [f for f in self.list() if f.endswith("catalog.json")]
        if not catalog_file:
            raise Exception("No catalog file found.")
        return self.read(catalog_file[0])

    def list(self, pattern=None):
        return self.storage.list(pattern)

    def get_url(self, name):
        return self.storage.get_url(name)

    def exists(self, name):
        return self.storage.exists(name)

    def read(self, name):
        ext = name.split(".")[-1]
        if ext in ["tif", "tiff"]:
            return rio.open(self.get_url(name))
        elif ext in ["json", "geojson"]:
            # return pd.read_json(self.get_url(name)).to_json() # problem with SSL certificate
            url = self.get_url(name)
            if type(url) == io.BytesIO:
                return json.load(url)
            if url.startswith("http://") or url.startswith("https://"):
                response = requests.get(url)
                return json.loads(response.json())
            with open(url, "r") as file:
                return json.load(file)
        raise TypeError("Not a valid type")

    def save(self, name, data):
        return self.storage.save(name, data)

    def path(self):
        return str(self.storage.path)
