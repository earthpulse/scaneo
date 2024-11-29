from fastapi import APIRouter, HTTPException, WebSocket
from pydantic import BaseModel

from src.usecases.campaigns import create_campaign, create_campaign_eotdl, retrieve_campaigns, delete_campaign, retrieve_one_campaign

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("")
def _retrieve_campaigns():
    try:
        return retrieve_campaigns()
    except Exception as e:
        print("error campaigns:get_campaigns", e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/{campaign_id}")
def _retrieve_one_campaigns(campaign_id: str):
    try:
        return retrieve_one_campaign(campaign_id)
    except Exception as e:
        print("error campaigns:get_one_campaign", e)
        raise HTTPException(status_code=500, detail=str(e))
    
class Body(BaseModel):
    name: str
    description: str
    path: str

# @router.post("")
# def _create_campaign(body: Body):
#     try:
#         return create_campaign(body.name, body.description, body.path)
#     except Exception as e:
#         print("error campaigns:create_campaign", e)
#         raise HTTPException(status_code=500, detail=str(e))

@router.websocket("/create")
async def websocket_create_campaign(websocket: WebSocket):
    await websocket.accept()
    try:
        # Receive the campaign data as JSON
        data = await websocket.receive_json()
        
        # Create campaign with progress callback
        async def progress_callback(progress: float, message: str):
            await websocket.send_json({
                "progress": progress,
                "message": message,
                "status": "processing"
            })
        
        # Call create_campaign with the callback
        result = await create_campaign(
            data["name"], 
            data["description"], 
            data["path"],
            progress_callback=progress_callback
        )
        
        # Send success response
        data = result.model_dump()
        await websocket.send_json({
            "status": "complete",
            "data": {
                "name": data["name"],
                "description": data["description"],
                "id": data["id"]
            }
        })
        
    except Exception as e:
        print("error campaigns:websocket_create_campaign", e)
        await websocket.send_json({
            "status": "error",
            "error": str(e)
        })
    finally:
        await websocket.close()

@router.delete("/{campaign_id}")
def _delete_campaign(campaign_id: str):
    try:
        return delete_campaign(campaign_id)
    except Exception as e:
        print("error campaigns:delete_campaign", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.websocket("/create-eotdl")
async def websocket_create_campaign_eotdl(websocket: WebSocket):
    await websocket.accept()
    try:
        # Receive the campaign data as JSON
        data = await websocket.receive_json()
        
        # Create campaign with progress callback
        async def progress_callback(progress: float, message: str):
            await websocket.send_json({
                "progress": progress,
                "message": message,
                "status": "processing"
            })
        
        # Call create_campaign with the callback
        result = await create_campaign_eotdl(
            data["name"], 
            data["description"], 
            data["eotdlDatasetId"],
            progress_callback=progress_callback
        )
        
        # Send success response
        data = result.model_dump()
        await websocket.send_json({
            "status": "complete",
            "data": {
                "name": data["name"],
                "description": data["description"],
                "id": data["id"]
            }
        })
        
    except Exception as e:
        print("error campaigns:websocket_create_campaign", e)
        await websocket.send_json({
            "status": "error",
            "error": str(e)
        })
    finally:
        await websocket.close()
