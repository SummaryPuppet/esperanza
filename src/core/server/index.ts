/**
 * @fileoverview Express server configuration and route definition.
 * @module core/server
 */

import express from "express";
import path from "path";
import mcpRouter from "./routes/mcp.route";
import modelsRouter from "./routes/models.route";
import transcibeRouter from "./routes/transcribe.route";
import voiceRouter from "./routes/voice.route";

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Middleware for processing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//app.use("/", agentRouter);

//app.use("/", emotionRouter);

//app.use("/", memoriesRouter);

app.use("/", mcpRouter);

app.use("/", modelsRouter);

app.use("/", transcibeRouter);

app.use("/", voiceRouter);

/**
 * Starts the server on the specified port.
 * @returns {void}
 */
export const startServer = (): void => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
};
