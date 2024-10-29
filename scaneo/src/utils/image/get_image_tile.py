import mercantile
import rasterio
import cachetools
from rasterio import warp, windows, transform
from affine import Affine
from rasterio.vrt import WarpedVRT
import numpy as np
from matplotlib import cm
import threading
from .cache import CompressedLFUCache
from .errors import ImageOutOfBounds
from .image_utils import to_uint8, contrast_stretch
import shapely
import shapely.geometry
from rasterio.warp import transform_bounds

# import geopandas as gpd

_cache_lock = threading.RLock()

#: Size of raster file in-memory cache in bytes
RASTER_CACHE_SIZE: int = 1024 * 1024 * 1024  # 1 GB
#: Compression level of raster file in-memory cache, from 0-9
RASTER_CACHE_COMPRESS_LEVEL: int = 9

_raster_cache = CompressedLFUCache(
    RASTER_CACHE_SIZE, compression_level=RASTER_CACHE_COMPRESS_LEVEL
)

# esto solo funciona si bounds están en lat, lng !


def tile_exists(xyz, bounds):
    x, y, z = xyz
    t1 = mercantile.tile(bounds[0], bounds[3], z)
    t2 = mercantile.tile(bounds[2], bounds[1], z)
    return t1.x <= x <= t2.x and t1.y <= y <= t2.y


def get_tile_data(file_path, xyz, bands, tile_size=(256, 256)):
    # tic = time.perf_counter()
    x, y, z = xyz

    # Determine the destination tile and its mercator bounds
    dst_tile = mercantile.Tile(x=x, y=y, z=z)
    tile_bounds = mercantile.xy_bounds(dst_tile)

    # print(file_path)

    src = rasterio.open(file_path)

    # with geopandas (works fine)
    # bb = shapely.geometry.box(*src.bounds)
    # gdf = gpd.GeoDataFrame(index=[0], crs=src.meta["crs"], geometry=[bb]).to_crs(
    #     "epsg:4326"
    # )
    # # check if tile is inside image bounds
    # if not tile_exists(xyz, gdf.geometry.iloc[0].bounds):
    #     raise ImageOutOfBounds(x, y, z)

    # without geopandas (check if it works)
    bounds = src.bounds
    src_crs = src.crs
    dst_crs = "EPSG:4326"
    wgs84_bounds = transform_bounds(src_crs, dst_crs, *bounds)
    bb = shapely.geometry.box(*wgs84_bounds)
    if not tile_exists(xyz, bb.bounds):
        raise ImageOutOfBounds(x, y, z)

    # return cached tile if exists
    kwargs = dict(
        path=file_path,
        tile_bounds=tuple(tile_bounds) if tile_bounds else None,
        tile_size=tuple(tile_size),
        bands=bands,
        # preserve_values=preserve_values,
        # reprojection_method=settings.REPROJECTION_METHOD,
        # resampling_method=settings.RESAMPLING_METHOD
    )
    cache_key = cachetools.keys.hashkey(**kwargs)
    try:
        with _cache_lock:
            return _raster_cache[cache_key]
    except KeyError:
        pass
    # toc = time.perf_counter()
    # print(f"5 in {toc - tic:0.8f} seconds")

    # vrt = WarpedVRT(src, crs='EPSG:3857', resampling=Resampling.bilinear)

    # tic = time.perf_counter()
    # compute suggested resolution in target CRS
    dst_transform, _, _ = warp.calculate_default_transform(
        src.crs, "EPSG:3857", src.width, src.height, *src.bounds
    )
    dst_res = (abs(dst_transform.a), abs(dst_transform.e))
    # toc = time.perf_counter()
    # print(f"6 in {toc - tic:0.8f} seconds")

    # make sure VRT resolves the entire tile
    # tile_transform = transform.from_bounds(*tile_bounds, *tile_size)
    # tile_res = (abs(tile_transform.a), abs(tile_transform.e))

    # tic = time.perf_counter()
    # pad tile bounds to prevent interpolation artefacts
    num_pad_pixels = 2

    # compute tile VRT shape and transform
    dst_width = max(1, round((tile_bounds[2] - tile_bounds[0]) / dst_res[0]))
    dst_height = max(1, round((tile_bounds[3] - tile_bounds[1]) / dst_res[1]))
    vrt_transform = transform.from_bounds(
        *tile_bounds, width=dst_width, height=dst_height
    ) * Affine.translation(-num_pad_pixels, -num_pad_pixels)
    vrt_height, vrt_width = (
        dst_height + 2 * num_pad_pixels,
        dst_width + 2 * num_pad_pixels,
    )
    # toc = time.perf_counter()
    # print(f"7 in {toc - tic:0.8f} seconds")

    # tic = time.perf_counter()
    # remove padding in output
    window = windows.Window(
        col_off=num_pad_pixels,
        row_off=num_pad_pixels,
        width=dst_width,
        height=dst_height,
    )
    # toc = time.perf_counter()
    # print(f"8 in {toc - tic:0.8f} seconds")

    # tic = time.perf_counter()
    # construct VRT
    vrt = WarpedVRT(
        src,
        crs="EPSG:3857",
        transform=vrt_transform,
        width=vrt_width,
        height=vrt_height,
    )
    # toc = time.perf_counter()
    # print(f"9 in {toc - tic:0.8f} seconds")

    # EL PROBLEMA PARECE ESTAR AQUÍ
    # aunque el timer da poco tiempo, la request se queda colgada un buen rato
    # tic = time.perf_counter()
    # for i in range(1000):
    tile_data = vrt.read(bands, window=window, out_shape=tile_size)
    # toc = time.perf_counter()
    # print(f"10 in {toc - tic:0.8f} seconds")

    # tic = time.perf_counter()
    # assemble alpha mask
    # mask_idx = vrt.count
    # mask = vrt.read(mask_idx, window=window, out_shape=self.tile_size) == 0
    mask = vrt.read(bands, window=window, out_shape=tile_size) == 0
    # toc = time.perf_counter()
    # print(f"11 in {toc - tic:0.8f} seconds")

    if src.nodata is not None:
        mask |= tile_data == src.nodata

    # tic = time.perf_counter()
    result = np.ma.masked_array(tile_data, mask=mask)
    # toc = time.perf_counter()
    # print(f"12 in {toc - tic:0.8f} seconds")

    # add to cache
    try:
        with _cache_lock:
            _raster_cache[cache_key] = result
    except ValueError:  # value too large
        pass

    return result


def get_image_data(tile_data, stretch, palette):
    # estoy hay que hacerlo mejor
    if tile_data.ndim == 2:
        # nodes_colors = palette.split(';') # 1,2,3;color1,color2,color3
        # if nodes_colors.length == 1:
        if palette:
            # pasamos de min-max al rango determinado por stretch (0-1)
            tile_data = contrast_stretch(
                tile_data, (stretch[0], stretch[1]), (0.0, 1.0), clip=True
            )
            # aplicar paleta (0-1)
            img_data = getattr(cm, palette)(tile_data)
            # convertir a uint8
            img_data = (img_data * 255).astype(np.uint8)
            return img_data
        # elif nodes_colors.length == 2:
        # nodes, colors = nodes_colors[0], nodes_colors[1]
        # assert len(nodes) == len(colors), 'nodes and colors must have the same length'
        # nodes = [float(n) for n in nodes.split(',')]
        # colors = colors.split(',)
        # apply palette
        else:
            tile_data = np.ma.stack([tile_data] * 3).transpose(1, 2, 0)
            return to_uint8(tile_data, stretch[0], stretch[1])
    elif tile_data.ndim == 3:
        tile_data = tile_data.transpose(1, 2, 0)
        return to_uint8(tile_data, stretch[0], stretch[1])
    else:
        raise ValueError("wrong dims")
