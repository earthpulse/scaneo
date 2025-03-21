from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.annotations import update_detection_annotation, retrieve_annotations, create_classification_annotation, create_detection_annotation, delete_annotation, create_segmentation_annotation, create_points_annotation, update_points_annotation

router = APIRouter(prefix="/annotations", tags=["annotations"])

@router.get("/{image_id}")
def _retrieve_annotations(image_id: str):
    try:
        return retrieve_annotations(image_id)
    except Exception as e:
        print("error annotations:retrieve_annotations", e)
        raise HTTPException(status_code=500, detail=str(e))

class ClassificationBody(BaseModel):
    imageId: int
    label: str

@router.post("/classification")
def _create_classification_annotation(body: ClassificationBody):
    try:
        return create_classification_annotation(body.imageId, body.label)
    except Exception as e:
        print("error annotations:create_classification_annotation", e)
        raise HTTPException(status_code=500, detail=str(e))

class DetectionBody(BaseModel):
    imageId: int
    label: str
    bb: list[list[float]]

@router.post("/detection")
def _create_detection_annotation(body: DetectionBody):
    try:
        return create_detection_annotation(body.imageId, body.bb, body.label)
    except Exception as e:
        print("error annotations:create_detection_annotation", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
def _delete_annotation(id: str):
    try:
        return delete_annotation(id)
    except Exception as e:
        print("error annotations:delete_annotation", e)
        raise HTTPException(status_code=500, detail=str(e))

class UpdateDetectionBody(BaseModel):
    bb: list[list[float]]

@router.put("/detection/{id}")
def _update_detection_annotation(id: str, body: UpdateDetectionBody):
    try:
        return update_detection_annotation(id, body.bb)
    except Exception as e:
        print("error annotations:update_detection_annotation", e)
        return HTTPException(status_code=500, detail=str(e))

class SegmentationBody(BaseModel):
    imageId: int
    label: str
    layer_data: object

@router.post("/segmentation")
def _create_segmentation_annotation(body: SegmentationBody):
    try:
        return create_segmentation_annotation(body.imageId, body.layer_data, body.label)
    except Exception as e:
        print("error annotations:create_segmentation_annotation", e)
        return HTTPException(status_code=500, detail=str(e))

class PointsBody(BaseModel):
    imageId: int
    label: str
    points: object

@router.post("/points")
def _create_points_annotation(body: PointsBody):
    try:
        return create_points_annotation(body.imageId, body.points, body.label)
    except Exception as e:
        print("error annotations:create_points_annotation", e)
        return HTTPException(status_code=500, detail=str(e))

class UpdatePointsBody(BaseModel):
    points: object

@router.put("/points/{id}")
def _update_points_annotation(id: str, body: UpdatePointsBody):
    try:
        return update_points_annotation(id, body.points)
    except Exception as e:
        print("error annotations:update_points_annotation", e)
        return HTTPException(status_code=500, detail=str(e))