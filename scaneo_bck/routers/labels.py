from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.storage import Storage


router = APIRouter(prefix="/labels", tags=["labels"])


class Body(BaseModel):
    labels: list


@router.post("")
def save_labels(body: Body):
    try:
        storage = Storage()
        if storage.is_stac:
            from src.stac import Stac

            stac = Stac(storage)
            stac.save_labels(body.labels)
        else:
            storage.save("labels.json", body.json())
        return {"status": "201 Created", "labels": body.labels}
    except Exception as e:
        print("error labels:save_labels", e)
        return HTTPException(status_code=500, detail="Could not save new label")


@router.get("")
def get_labels():
    try:
        storage = Storage()
        if storage.is_stac:
            from src.stac import Stac

            stac = Stac(storage)
            labels_and_colors = stac.get_labels_and_colors()
            return {"labels": labels_and_colors}
        labels_file = [f for f in storage.list() if f.endswith("labels.json")]
        if len(labels_file) > 0:
            kk = storage.read(labels_file[0])
            print(kk)
            return kk
        return HTTPException(status_code=404, detail="Labels file not found")

    except Exception as e:
        print("error labels:get_labels", e)
        return HTTPException(status_code=500, detail="Could not get labels")
