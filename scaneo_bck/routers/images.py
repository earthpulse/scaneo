from fastapi import APIRouter, HTTPException, BackgroundTasks, status
from starlette.responses import StreamingResponse
from src.image import get_image_data, get_tile_data, ready_image
from src.image.errors import ImageOutOfBounds
from src.storage import Storage
from src.cache import get_dict_from_db, persist_dict_in_db
import os


router = APIRouter(prefix="/images", tags=["images"])


@router.get("")
def get_images(background_tasks: BackgroundTasks):
    try:
        storage = Storage()
        images_info = get_dict_from_db(storage.name)
        # background_tasks.add_task(persist_dict_in_db, storage.name, images_info)
        return images_info
    except Exception as e:
        print("error images:get_images", e)
        return HTTPException(status_code=500, detail=str(e))


image_url_cache = {}


@router.get("/{image:path}/{z}/{x}/{y}.png")
def retrieve_image_tile(
    image: str,
    z: int,
    x: int,
    y: int,
    bands: str = "4,3,2",
    stretch: str = "0,3000",
    palette: str = "viridis",
):
    storage = Storage()
    image_url = ""
    if image in image_url_cache:
        image_url = image_url_cache[image]
    else:
        if storage.is_stac:
            image_url = os.path.join(os.path.dirname(os.getenv("DATA")), image)
        else:
            image_url = storage.get_url(image)
        image_url_cache[image] = image_url
    tile_size = (256, 256)
    if len(bands) == 1:
        bands = int(bands)
    else:
        bands = tuple([int(band) for band in bands.split(",")])
    stretch = tuple([float(v) for v in stretch.split(",")])
    try:
        tile = get_tile_data(image_url, image, (x, y, z), bands, tile_size)
        tile = get_image_data(tile, stretch, palette)
        image = ready_image(tile)
        return StreamingResponse(image, media_type="image/png")
    except ImageOutOfBounds as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error.message)
    except Exception as e:
        print("error images:retrieve_image_tile", e)
        raise HTTPException(status_code=500, detail="Could not retrieve tile")
