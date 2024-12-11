from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.export import save_annotations
from src.usecases.labels import save_labels
router = APIRouter(prefix="/geojson", tags=["geojson"])

class SaveBody(BaseModel):
    campaignId: str


@router.post("/save")
def _save_annotations(
    body: SaveBody,
):
    try:
        save_labels(body.campaignId)
        save_annotations(body.campaignId)
    except Exception as e:
        print("error geojson:save_geojson", e)
        return HTTPException(status_code=500, detail="Could not save geojson")