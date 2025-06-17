from .server import Server
from .config import Config

import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


class MCPClient:
    mcp_servers: list[Server]
    all_tools: list

    def __init__(self):
        self.mcp_servers = self.create_servers()
        self.all_tools = []

    def create_servers(self):
        config = Config()

        servers = [
            Server(name, server_config)
            for name, server_config in config.mcp_servers.items()
        ]

        return servers

    async def initialize(self):
        await self.__initialize_servers()
        await self.__initialize_tools()

    async def __initialize_servers(self):
        for server in self.mcp_servers:
            try:
                await server.initialize()
            except Exception as e:
                logging.error(f"Failed to initialize server: {e}")
                await self.cleanup_servers()
                return

    async def __initialize_tools(self):
        for server in self.mcp_servers:
            tools = await server.list_tools()
            self.all_tools.extend(tools)

    async def cleanup_servers(self) -> None:
        """Clean up all servers properly."""
        for server in reversed(self.mcp_servers):
            try:
                await server.cleanup()
            except Exception as e:
                logging.warning(f"Warning during final cleanup: {e}")
