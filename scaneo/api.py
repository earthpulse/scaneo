from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

# serve static files from ui directory
app.mount(
    "/",
    StaticFiles(
        directory=os.path.dirname(os.path.realpath(__file__)) + "/ui", html=True
    ),
    name="ui",
)

# multi page app fallback
@app.exception_handler(404)
async def custom_404_handler(request: Request, exc):
    path = request.url.path.lstrip("/")
    html_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), "ui", f"{path}.html")
    
    if os.path.isfile(html_file):
        return FileResponse(html_file)
    
    # Fallback to index.html for SPA routes
    index_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), "ui", "index.html")
    if os.path.isfile(index_file):
        return FileResponse(index_file)
    
    return FileResponse(os.path.join(os.path.dirname(os.path.realpath(__file__)), "ui", "index.html"))


if __name__ == "__main__":
    app()
