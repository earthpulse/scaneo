from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.plugins import retrieve_plugins, enable_plugin, disable_plugin

router = APIRouter(prefix="/_plugins", tags=["plugins"])

@router.get("")
def _retrieve_plugins():
    try:
        return retrieve_plugins()
    except Exception as e:
        print("error plugins:retrieve_plugins", e)
        raise HTTPException(status_code=500, detail=str(e))


class Body(BaseModel):
    name: str

@router.post("")
def _enable_plugin(body: Body):
    try:
        return enable_plugin(body.name)
    except Exception as e:
        print("error plugins:enable_plugin", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{name}")
def _disable_plugin(name: str):
    try:
        return disable_plugin(name)
    except Exception as e:
        print("error plugins:disable_plugin", e)
        raise HTTPException(status_code=500, detail=str(e))
