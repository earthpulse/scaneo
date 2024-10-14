from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from src.storage import Storage
from src.image import get_images_info
from src.cache.cache import get_cache_dir, create_database, persist_dict_in_db, get_dict_from_db
from routers import images, labels, geojson


app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(images.router)
app.include_router(labels.router)
app.include_router(geojson.router)


# TODO: option to update db (if dataset changes)
storage = Storage()
image_info = get_images_info(True)
if os.path.exists(get_cache_dir() + f"{storage.name}.db"): 
    if image_info != get_dict_from_db(storage.name):
        if create_database(storage.name, False):
            persist_dict_in_db(storage.name, image_info, True)
else:
    create_database(storage.name, True)
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