from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.images import retrieve_images

router = APIRouter(prefix="/images", tags=["images"])

@router.get("/{campaign}")
def _retrieve_images(campaign: str):
    try:
        return retrieve_images(campaign)
    except Exception as e:
        print("error images:retrieve_images", e)
        return HTTPException(status_code=500, detail=str(e))
