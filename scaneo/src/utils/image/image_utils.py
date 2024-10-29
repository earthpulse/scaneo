import numpy as np
from PIL import Image
import io
import rasterio
from tqdm import tqdm

supported_image_extensions = [".tif", ".tiff"]


def ready_image(data, scale=1.0):
    # define mode
    if data.ndim == 3:
        if data.shape[-1] == 3:  # encode RGB image
            mode = "RGB"
        elif data.shape[-1] == 4:  # encode RGBA image
            mode = "RGBA"
        else:
            raise ValueError("Input array with 3 dimensions must be RGB or RGBA")
    elif data.ndim == 2:  # encode paletted image
        mode = "L"
    else:
        raise ValueError("Input array must have 2 or 3 dimensions")
    # add transparency
    transparency = (0, 0, 0)
    if isinstance(data, np.ma.MaskedArray):
        data = data.filled(0)
    # create image
    img = Image.fromarray(data, mode=mode)
    # rescale image if necessary
    if scale != 1.0:
        h, w = data.shape[:2]
        nh, nw = int(h / scale), int(w / scale)
        img.thumbnail([nw, nh], Image.ANTIALIAS)
    # make buffer
    buf = io.BytesIO()
    if data.ndim == 3 and data.shape[-1] == 4:
        img.save(buf, "png")
    else:
        img.save(buf, "png", transparency=transparency)
    buf.seek(0)
    return buf


def contrast_stretch(data, in_range, out_range, clip):
    lower_bound_in, upper_bound_in = in_range
    lower_bound_out, upper_bound_out = out_range

    out_data = data.astype("float64", copy=True)
    out_data -= lower_bound_in
    norm = upper_bound_in - lower_bound_in
    if abs(norm) > 1e-8:  # prevent division by 0
        out_data *= (upper_bound_out - lower_bound_out) / norm
    out_data += lower_bound_out
    if clip:
        np.clip(out_data, lower_bound_out, upper_bound_out, out=out_data)
    return out_data


def to_uint8(data, lower_bound, upper_bound):
    rescaled = contrast_stretch(data, (lower_bound, upper_bound), (0, 255), clip=True)
    return rescaled.astype(np.uint8)


def get_bbox(image):
    src = rasterio.open(image)
    bounds = src.bounds
    crs = src.crs
    if crs != "EPSG:4326":
        bounds = rasterio.warp.transform_bounds(crs, "EPSG:4326", *bounds)
    return bounds


# def get_images_info(verbose=False):
#     if verbose:
#         print("Getting images info")
#     storage = Storage()
#     if storage.is_stac:
#         from src.stac import Stac

#         stac = Stac(storage)
#         source_items = stac.get_items_paths(stac.source_collection())
#         images_info = stac.get_images_info(source_items)
#         return images_info if images_info else []
#     images = []
#     paths = []
#     bboxes = []
#     # TODO: improve performance
#     for f in tqdm(storage.list()):
#         if any(f.endswith(ext) for ext in supported_image_extensions):
#             images.append(f)
#             paths.append(storage.get_url(f))
#             bboxes.append(get_bbox(storage.get_url(f)))
#     return [{"name": image, "bbox": bbox} for image, bbox in zip(images, bboxes)]
