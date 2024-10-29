from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.annotations import retrieve_annotations, create_classification_annotation, create_detection_annotation, delete_annotation

router = APIRouter(prefix="/annotations", tags=["annotations"])

@router.get("/{image_id}")
def _retrieve_annotations(image_id: str):
    try:
        return retrieve_annotations(image_id)
    except Exception as e:
        print("error annotations:retrieve_annotations", e)
        return HTTPException(status_code=500, detail=str(e))

class ClassificationBody(BaseModel):
    imageId: int
    label: str

@router.post("/classification")
def _create_classification_annotation(body: ClassificationBody):
    try:
        return create_classification_annotation(body.imageId, body.label)
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

class DetectionBody(BaseModel):
    imageId: int
    label: str
    bb: list[list[float]]

@router.post("/detection")
def _create_detection_annotation(body: DetectionBody):
    try:
        return create_detection_annotation(body.imageId, body.bb, body.label)
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
def _delete_annotation(id: str):
    try:
        return delete_annotation(id)
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
