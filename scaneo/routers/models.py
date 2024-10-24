from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.models import create_model, retrieve_models, delete_model, retrieve_one_model

router = APIRouter(prefix="/models", tags=["models"])

@router.get("")
def _retrieve_models():
    try:
        return retrieve_models()
    except Exception as e:
        print("error models:retrieve_models", e)
        return HTTPException(status_code=500, detail=str(e))
    

@router.get("/{model_id}")
def _retrieve_one_models(model_id: str):
    try:
        return retrieve_one_model(model_id)
    except Exception as e:
        print("error models:retrieve_one_model", e)
        return HTTPException(status_code=500, detail=str(e))
    
class Body(BaseModel):
    name: str
    description: str
    url: str

@router.post("")
def _create_model(body: Body):
    try:
        return create_model(body.name, body.description, body.url)
    except Exception as e:
        print("error models:create_model", e)
        return HTTPException(status_code=500, detail=str(e))

@router.delete("/{model_id}")
def _delete_model(model_id: str):
    try:
        return delete_model(model_id)
    except Exception as e:
        print("error models:delete_model", e)
        return HTTPException(status_code=500, detail=str(e))
