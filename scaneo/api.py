from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from src.storage import Storage
from src.image import get_images_info
from src.cache.cache import reload_db
from routers import images, labels, geojson


app = FastAPI(docs_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
storage = Storage()
images_info= get_images_info()

#Websocket doesn't support Fastapi router
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    if await websocket.receive_text() == "refresh_db":
        reload_db(storage.name, get_images_info())
        await websocket.send_text("refresh_db_ended")

app.include_router(images.router)
app.include_router(labels.router)
app.include_router(geojson.router)


# TODO: option to update db (if dataset changes)
reload_db(storage.name, images_info)
# this needs to be last in order to not override other routes
# ui is in same directory as this file
# in order for this to work with multipage apps, make sure to use trailingSlash = 'always' in svelte layout
app.mount(
    "/",
    StaticFiles(
        directory=os.path.dirname(os.path.realpath(__file__)) + "/ui", html=True
    ),
    name="ui",
)


if __name__ == "__main__":
    app()