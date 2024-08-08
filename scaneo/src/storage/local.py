from glob import glob
import os
import json


class LocalStorage:
    def __init__(self, path):
        self.path = path

    def list(self, pattern):
        pattern = "**/*" if not pattern else pattern
        paths = glob(os.path.join(self.path, pattern), recursive=True)
        return [p.replace(self.path + "/", "") for p in paths]

    def get_url(self, name):
        return os.path.join(self.path, name)

    def exists(self, name):
        return os.path.exists(os.path.join(self.path, name))

    def save(self, name, data):
        with open(os.path.join(self.path, name), "w") as f:
            json.dump(json.loads(data), f)
        return self.get_url(name)

    def path(self):
        return self.path
