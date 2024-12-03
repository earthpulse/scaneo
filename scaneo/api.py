from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import campaigns, images, models, plugins, labels, annotations

app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(campaigns.router)
app.include_router(images.router)
app.include_router(models.router)
app.include_router(plugins.router)
app.include_router(labels.router)
app.include_router(annotations.router)

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
