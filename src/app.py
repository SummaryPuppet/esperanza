from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager

from .routers.llm_audio import router as llm_router
from .routers.mcp_server import router as mcp_server_router

from .services.model_context_protocol import MCP_CLIENT


@asynccontextmanager
async def lifespan(app: FastAPI):
    await MCP_CLIENT.initialize()  # NOT AVAILABLE IN HOT RELOAD
    yield
    await MCP_CLIENT.cleanup_servers()  # NOY AVAILABLE IN HOT RELOAD

app = FastAPI(lifespan=lifespan)

app.mount("/static", StaticFiles(directory="/app/src/static"), name="static")

app.include_router(llm_router)
app.include_router(mcp_server_router)


@app.get("/")
def index():
    return FileResponse("/app/src/templates/index.html")
