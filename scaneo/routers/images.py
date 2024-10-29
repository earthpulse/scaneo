from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from src.usecases.images import retrieve_images
from src.utils.image import get_image_data, get_tile_data, ready_image
from src.utils.image.errors import ImageOutOfBounds

router = APIRouter(prefix="/images", tags=["images"])

@router.get("/{campaign}")
def _retrieve_images(campaign: str):
    try:
        return retrieve_images(campaign)
    except Exception as e:
        print("error images:retrieve_images", e)
        return HTTPException(status_code=500, detail=str(e))

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
    tile_size = (256, 256)
    if len(bands) == 1:
        bands = int(bands)
    else:
        bands = tuple([int(band) for band in bands.split(",")])
    stretch = tuple([float(v) for v in stretch.split(",")])
    try:
        tile = get_tile_data(image, (x, y, z), bands, tile_size)
        tile = get_image_data(tile, stretch, palette)
        image = ready_image(tile)
        return StreamingResponse(image, media_type="image/png")
    except ImageOutOfBounds as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error.message)
    except Exception as e:
        print("error images:retrieve_image_tile", e)
        raise HTTPException(status_code=500, detail="Could not retrieve tile")
