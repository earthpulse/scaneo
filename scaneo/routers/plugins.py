from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.plugins import retrieve_plugins, install_plugin, uninstall_plugin

router = APIRouter(prefix="/plugins", tags=["plugins"])

@router.get("")
def _retrieve_plugins():
    try:
        return retrieve_plugins()
    except Exception as e:
        print("error plugins:retrieve_plugins", e)
        return HTTPException(status_code=500, detail=str(e))


class Body(BaseModel):
    name: str

@router.post("")
def _install_plugin(body: Body):
    try:
        return install_plugin(body.name)
    except Exception as e:
        print("error plugins:install_plugin", e)
        return HTTPException(status_code=500, detail=str(e))

@router.delete("/{name}")
def _uninstall_plugin(name: str):
    try:
        return uninstall_plugin(name)
    except Exception as e:
        print("error plugins:uninstall_plugin", e)
        return HTTPException(status_code=500, detail=str(e))
