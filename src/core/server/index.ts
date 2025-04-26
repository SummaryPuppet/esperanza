import express from "express";
import { sseGet, ssePost } from "./mcp";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.get("/sse", (req, res) => {
  sseGet(res);
});

app.post("/sse", (req, res) => {
  ssePost(req, res);
});

export const startServer = () => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
};
