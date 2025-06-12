from .types import MCPServerJSON

import json


class Config:
    mcp_servers: dict[str, MCPServerJSON]

    def __init__(self, path: str = "/app/mcp.config.json"):
        self.__read_config(path)

    def __read_config(self, path: str):
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
            self.mcp_servers = data["mcpServers"]

    def get_mcp_server_config(self, name: str):
        mcp_server_config = self.mcp_servers.get(name)

        return mcp_server_config
