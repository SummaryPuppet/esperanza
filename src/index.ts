import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import dotenv from "dotenv";
import express from "express";
import { z } from "zod";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/sse", res);
  mcpServer.connect(transport);
});

app.post("/sse", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
