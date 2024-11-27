from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.labels import retrieve_labels, create_label, delete_label

router = APIRouter(prefix="/labels", tags=["labels"])

@router.get("/{campaign}")
def _retrieve_labels(campaign: str):
    try:
        return retrieve_labels(campaign)
    except Exception as e:
        print("error labels:retrieve_labels", e)
        raise HTTPException(status_code=500, detail=str(e))

class Body(BaseModel):
    name: str
    campaign: str
    color: str

@router.post("")
def _create_label(body: Body):
    try:
        return create_label(body.name, body.color, body.campaign)
    except Exception as e:
        print("error labels:create_label", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
def _delete_label(id: str):
    try:
        return delete_label(id)
    except Exception as e:
        print("error labels:delete_label", e)
        raise HTTPException(status_code=500, detail=str(e))