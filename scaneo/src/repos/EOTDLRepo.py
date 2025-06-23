import requests
from io import BytesIO
import fnmatch
import os
import json

class EOTDLRepo:
    def __init__(self):
        self.url = "https://api.eotdl.com/"
        # get user credentials from env or creds file
        self.user = None 
        if 'EOTDL_API_KEY' in os.environ:
            self.user = {'api_key': os.environ['EOTDL_API_KEY']}
        else:
            try:
                with open(os.path.expanduser('~/.eotdl/creds.json')) as f:
                    self.user = json.load(f)
            except FileNotFoundError:
                raise Exception("No EOTDL credentials found. Please run `eotdl auth login` or set the EOTDL_API_KEY environment variable.")

    def format_response(self, response):
        if response.status_code == 200:
            return response.json(), None
        return None, response.json()["detail"]

    def generate_headers(self, data):
        if "api_key" in data:
            return {"X-API-Key": data["api_key"]}
        if "id_token" in data:
            return {"Authorization": "Bearer " + data["id_token"]}
        raise Exception("Invalid headers")

    def get_url(self, eotdlDatasetId, file_id, version=None):
        file_url = f"https://api.eotdl.com/datasets/{eotdlDatasetId}/stage/{file_id}"
        if version is not None:
            file_url += "?version=" + str(version)
        headers = self.generate_headers(self.user)
        response = requests.get(file_url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.json()['presigned_url']
    
    def get_files(self, dataset_name, pattern=None):
        res = requests.get(f"https://api.eotdl.com/stac/collections/{dataset_name}/items")
        files, error = self.format_response(res)
        if error:
            return None, error
        files = [f["id"] for f in files]
        if pattern:
            files = [f for f in files if fnmatch.fnmatch(f, pattern)]
        return files, None

    def get_dataset(self, eotdlDatasetName):
        res = requests.get(f"https://api.eotdl.com/datasets?name={eotdlDatasetName}")
        dataset, error = self.format_response(res)
        if error:
            return None, error
        return dataset['id']