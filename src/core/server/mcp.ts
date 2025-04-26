import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Request, Response } from "express";
import { z } from "zod";

const mcpServer = new McpServer({
  name: "esperanza-mcp",
  version: "0.0.1",
});

mcpServer.tool(
  "greatting",
  "Tool for greatting to user",
  { name: z.string().describe("User name") },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}, how are you?`,
        },
      ],
    };
  }
);

let transport: SSEServerTransport | null = null;

export const sseGetController = (_: Request, res: Response) => {
  transport = new SSEServerTransport("/sse", res);
  mcpServer.connect(transport);
};

export const ssePostController = (req: Request, res: Response) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
};
