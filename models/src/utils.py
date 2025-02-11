import os
import requests
import geopandas as gpd
import numpy as np


EOTDL_API_URL = "https://api.eotdl.com/"
EOTDL_API_KEY = os.getenv("EOTDL_API_KEY")


def format_response(response):
    if response.status_code == 200:
        return response.json(), None
    return None, response.json()["detail"]


def retrieve_model(name):
    response = requests.get(EOTDL_API_URL + "models?name=" + name)
    return format_response(response)


def retrieve_model_stac(model_id, version):
    url = f"{EOTDL_API_URL}models/{model_id}/download"
    headers = {"X-API-Key": EOTDL_API_KEY}
    response = requests.get(url, headers=headers)
    data, error = format_response(response)
    if data:
        return gpd.GeoDataFrame.from_features(response.json()["features"]), None
    return data, error


def download_file_url(url, filename, path):
    headers = {"X-API-Key": EOTDL_API_KEY}
    path = f"{path}/{filename}"
    for i in range(1, len(path.split("/")) - 1):
        os.makedirs("/".join(path.split("/")[: i + 1]), exist_ok=True)
    with requests.get(url, headers=headers, stream=True) as r:
        r.raise_for_status()
        total_size = int(r.headers.get("content-length", 0))
        block_size = 1024 * 1024 * 10
        with open(path, "wb") as f:
            for chunk in r.iter_content(block_size):
                if chunk:
                    f.write(chunk)
        return path


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


# def reshape(x, input, output_shape, input_shape):
#     _output_shape = output_shape
#     _output_shape[0] = input.shape[0]  # batch size (maybe not always)
#     for i in range(1, len(output_shape)):
#         dim = output_shape[i]
#         if dim == -1:
#             j = (
#                 i + 1 if len(input_shape) > len(output_shape) else i
#             )  # skip channel dimension if input has one more dimension (assuming channles first which may not be always the case)
#             if input_shape[j] == -1:
#                 _output_shape[i] = input.shape[j]  # take first input shape as reference
#             else:
#                 _output_shape[i] = input_shape[j]
#         else:
#             _output_shape[i] = dim
#     # it may require a resize as well...
#     return x.reshape(_output_shape)