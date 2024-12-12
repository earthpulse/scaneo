from fastapi import APIRouter, HTTPException, WebSocket
from pydantic import BaseModel

from src.usecases.campaigns import export_campaign, create_campaign, create_campaign_eotdl, retrieve_campaigns, delete_campaign, retrieve_one_campaign, create_imported_campaign, retrieve_campaign_label_mappings, update_label_mappings

router = APIRouter(prefix="/_campaigns", tags=["campaigns"])

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
            data["labels"],
            data["labelMappings"],
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

@router.websocket("/import")
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
        result = await create_imported_campaign(
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
        print("error campaigns:websocket_import_campaign", e)
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
            data["labels"],
            data["labelMappings"],
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


@router.get("/{campaign_id}/label_mappings")
def _retrieve_label_mappings(campaign_id: str):
    try:
        return retrieve_campaign_label_mappings(campaign_id)
    except Exception as e:
        print("error campaigns:retrieve_campaign_label_mappings", e)
        raise HTTPException(status_code=500, detail=str(e))
    
class UpdateLabelMappingsBody(BaseModel):
    data: dict

@router.post("/{campaign_id}/label_mappings")
def _update_label_mappings(campaign_id: str, body: UpdateLabelMappingsBody):
    try:
        return update_label_mappings(campaign_id, body.data) 
    except Exception as e:
        print("error campaigns:update_label_mappings", e)
        raise HTTPException(status_code=500, detail=str(e))
    

# @router.post("/{campaign_id}/export")
# def _export_campaign(campaign_id: str):
#     try:
#         return export_campaign(campaign_id)
#     except Exception as e:
#         print("error campaigns:export_campaign", e)
#         raise HTTPException(status_code=500, detail=str(e))

@router.websocket("/{campaign_id}/export")
async def websocket_export_campaign(websocket: WebSocket, campaign_id: str):
    await websocket.accept()
    try:
        # Receive the campaign data as JSON
        data = await websocket.receive_json()

        # Create campaign with progress callback
        async def progress_callback(progress: float, message: str):
            await websocket.send_json({
                "progress": progress,
                "message": message,
                "status": "exporting"
            })
        
        # Call create_campaign with the callback
        await export_campaign(
            campaign_id,
            data["exportType"],
            data["exportPath"],
            progress_callback=progress_callback
        )
        
        # Send success response
        await websocket.send_json({
            "status": "complete",
        })
        
    except Exception as e:
        print("error campaigns:websocket_export_campaign", e)
        await websocket.send_json({
            "status": "error",
            "error": str(e)
        })
    finally:
        await websocket.close()