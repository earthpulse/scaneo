from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.campaigns import create_campaign, retrieve_campaigns

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("")
def _retrieve_campaigns():
    try:
        return retrieve_campaigns()
    except Exception as e:
        print("error campaigns:get_campaigns", e)
        return HTTPException(status_code=500, detail=str(e))
    
class Body(BaseModel):
    name: str
    description: str

@router.post("")
def _create_campaign(body: Body):
    try:
        return create_campaign(body.name, body.description)
    except Exception as e:
        print("error campaigns:create_campaign", e)
        return HTTPException(status_code=500, detail=str(e))
