from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from src.usecases.models import create_model, retrieve_models, delete_model, retrieve_one_model, inference_model, retrieve_model_label_mappings
import traceback

router = APIRouter(prefix="/_models", tags=["models"])

@router.get("")
def _retrieve_models(campaign: Optional[str] = None):
    try:
        return retrieve_models(campaign)
    except Exception as e:
        print("error models:retrieve_models", e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/{model_id}")
def _retrieve_one_models(model_id: str):
    try:
        return retrieve_one_model(model_id)
    except Exception as e:
        print("error models:retrieve_one_model", e)
        raise HTTPException(status_code=500, detail=str(e))
    
class Body(BaseModel):
    name: str
    description: str
    url: str
    task: str
    preprocessing: Optional[List[str]] = []
    postprocessing: Optional[List[str]] = []

@router.post("")
def _create_model(body: Body):
    try:
        return create_model(body.name, body.description, body.url, body.task, body.preprocessing, body.postprocessing)
    except Exception as e:
        print("error models:create_model", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{model_id}")
def _delete_model(model_id: str):
    try:
        return delete_model(model_id)
    except Exception as e:
        print("error models:delete_model", e)
        raise HTTPException(status_code=500, detail=str(e))

class InferenceBody(BaseModel):
    image: int

@router.post("/inference/{model_id}")
def _inference_model(model_id: str, body: InferenceBody):
    try:
        return inference_model(model_id, body.image)
    except Exception as e:
        traceback.print_exc()
        print("error models:inference_model", e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/{campaign_id}/label_mappings")
def _retrieve_label_mappings(model_id: str):
    try:
        return retrieve_model_label_mappings(model_id)
    except Exception as e:
        print("error models:retrieve_model_label_mappings", e)
        raise HTTPException(status_code=500, detail=str(e))