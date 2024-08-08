from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os
from src.storage import Storage

router = APIRouter(prefix="/geojson", tags=["geojson"])


class GeoJSONFeature(BaseModel):
    type: str
    geometry: dict
    properties: dict


class GeoJSON(BaseModel):
    type: str
    features: List[GeoJSONFeature]


class SaveBody(BaseModel):
    name: str
    geojson: GeoJSON


@router.post("")
def save_geojson(
    body: SaveBody,
):
    try:
        storage = Storage()
        if storage.is_stac:
            from src.stac import Stac

            stac = Stac(storage)
            stac.save(body.name, body.geojson)
        else:
            storage.save(
                os.path.splitext(body.name)[0] + "_labels.geojson",
                body.geojson.json(),
            )
        return {
            "status": "201 Created",
            "geojson": body.geojson,
            "imageName": body.name,
        }
    except Exception as e:
        print("error geojson:save_geojson", e)
        return HTTPException(status_code=500, detail="Could not save geojson")


@router.get("/{image_path:path}")
def get_geojson(image_path: str):
    try:
        storage = Storage()
        if storage.is_stac:
            from src.stac import Stac

            stac = Stac(storage)
            annotations = stac.get_annotations(image_path)
            if annotations:
                return annotations
            return HTTPException(status_code=404, detail="Geojson not found")
        file_name = os.path.splitext(image_path)[0] + "_labels.geojson"
        return storage.read(file_name)
    except Exception as e:
        print("error geojson:get_geojson", e)
        return HTTPException(status_code=500, detail="Could not get geojson")
