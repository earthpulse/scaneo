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

    def get_url(self, dataset_id, filename, version=None):
        url = self.url + f"datasets/{dataset_id}/download/{filename}"
        if version is not None:
            url += "?version=" + str(version)
        headers = self.generate_headers(self.user)
        response = requests.get(url, headers=headers, stream=True)
        return BytesIO(response.content)
    
    def get_files(self, dataset_id, pattern=None):
        res = requests.get(f"https://api.eotdl.com/datasets/{dataset_id}/files")
        files, error = self.format_response(res)
        if error:
            return None, error
        files = [f["filename"] for f in files]
        if pattern:
            return fnmatch.filter(files, pattern), None
        return files, None
    