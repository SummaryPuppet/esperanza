from typing import TypedDict


class MCPServerJSON(TypedDict):
    command: str
    args: list[str]
    env: dict[str, str] | None


class MCPJSON(TypedDict):
    mcpServers: dict[str, MCPServerJSON]
