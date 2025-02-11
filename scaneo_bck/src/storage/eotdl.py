try:
    import eotdl
except ImportError:
    raise Exception(
        "EOTDL is not installed. Please install EOTDL with `pip install eotdl`."
    )
import os
from eotdl.files import list_files
from eotdl.datasets import retrieve_dataset
from eotdl.repos import FilesAPIRepo
from eotdl.auth import with_auth
import hashlib
import fnmatch
import json
import shutil


def calculate_checksum(file_path):
    sha1_hash = hashlib.sha1()
    with open(file_path, "rb") as file:
        for chunk in iter(lambda: file.read(4096), b""):
            sha1_hash.update(chunk)
    return sha1_hash.hexdigest()


class EOTDLStorage:
    def __init__(self, dataset):
        self.url = "https://api.eotdl.com/"
        # self.url = "http://localhost:8001/"
        os.environ["EOTDL_API_URL"] = self.url
        os.system("eotdl auth login")
        dataset = retrieve_dataset(dataset)
        self.dataset = dataset
        assert dataset["quality"] == 0, "Only Q0 datasets are supported."
        self.download_url = self.url + "datasets/" + dataset["id"] + "/download/"
        self.repo = FilesAPIRepo(self.url)

    def list(self, pattern):
        files = list_files(self.dataset["name"])
        files = [f["filename"] for f in files]
        if pattern:
            return fnmatch.filter(files, pattern)
        return files

    @with_auth
    def get_url(self, filename, user):
        # instead of a url it returns the data stream directly
        return self.repo.get_file_stream(self.dataset["id"], filename, user)

    def exists(self, name):
        return name in self.list()

    @with_auth
    def save(self, name, data, user):
        path = "/tmp/scaneo/" + name
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            json.dump(json.loads(data), f)
        repo = FilesAPIRepo(self.url)
        last_version = sorted([v["version_id"] for v in self.dataset["versions"]])[-1]
        data, error = repo.ingest_file(
            path,
            self.dataset["id"],
            user,
            calculate_checksum(path),
            "datasets",
            last_version,
        )
        if error:
            raise Exception(error)
        shutil.rmtree("/tmp/scaneo")

    def path(self):
        pass
