from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.usecases.campaigns import create_campaign, retrieve_campaigns, delete_campaign, retrieve_one_campaign

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("")
def _retrieve_campaigns():
    try:
        return retrieve_campaigns()
    except Exception as e:
        print("error campaigns:get_campaigns", e)
        return HTTPException(status_code=500, detail=str(e))
    

@router.get("/{campaign_id}")
def _retrieve_one_campaigns(campaign_id: str):
    try:
        return retrieve_one_campaign(campaign_id)
    except Exception as e:
        print("error campaigns:get_one_campaign", e)
        return HTTPException(status_code=500, detail=str(e))
    
class Body(BaseModel):
    name: str
    description: str
    path: str

@router.post("")
def _create_campaign(body: Body):
    try:
        return create_campaign(body.name, body.description, body.path)
    except Exception as e:
        print("error campaigns:create_campaign", e)
        return HTTPException(status_code=500, detail=str(e))

@router.delete("/{campaign_id}")
def _delete_campaign(campaign_id: str):
    try:
        return delete_campaign(campaign_id)
    except Exception as e:
        print("error campaigns:delete_campaign", e)
        return HTTPException(status_code=500, detail=str(e))
