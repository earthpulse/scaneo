try:
    from minio import Minio
except ImportError:
    raise Exception(
        "Minio is not installed. Please install Minio with `pip install minio`."
    )

import fnmatch
import json
import os
import io


class CloudStorage:
    def __init__(self, url, access_key, secret_key, bucket, region, prefix=None):
        self.url = url
        self.access_key = access_key
        self.secret_key = secret_key
        self.bucket = bucket
        self.prefix = prefix
        self.region = region
        self.client = Minio(
            endpoint=url,
            access_key=access_key,
            secret_key=secret_key,
            secure=True,
            region=region,
        )
        if not self.client.bucket_exists(self.bucket):
            raise Exception("Bucket does not exist.")

    def list(self, pattern):
        pattern = "**/*" if not pattern else pattern
        return fnmatch.filter(
            [
                obj.object_name
                for obj in self.client.list_objects(self.bucket, recursive=True)
                # for obj in self.client.list_objects(self.bucket, prefix=self.prefix)
            ],
            pattern,
        )

    def get_name(self, name):
        return name if not self.prefix else os.path.join(self.prefix, name)

    def get_url(self, name):
        return self.client.presigned_get_object(self.bucket, self.get_name(name))

    def exists(self, name):
        try:
            return self.client.stat_object(self.bucket, self.get_name(name))
        except:
            return False

    def save(self, name, data):
        data = json.dumps(data)
        data_bytes = data.encode("utf-8")
        data_file = io.BytesIO(data_bytes)
        self.client.put_object(
            self.bucket, self.get_name(name), data_file, len(data_bytes)
        )
        return self.get_url(name)

    def path(self):
        return self.url
