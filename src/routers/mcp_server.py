from fastapi import APIRouter

from ..services.model_context_protocol import MCP_CLIENT

router = APIRouter()


@router.get("/api/available-tools")
async def list_tools():
    tools = MCP_CLIENT.all_tools

    return {
        "data": {
            "available_tools": tools
        }
    }


@router.post("/llm-tools")
async def llm_mcp_server():
    pass
