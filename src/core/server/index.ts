/**
 * @fileoverview Express server configuration and route definition.
 * @module core/server
 */

import express from "express";
import { agentController } from "./agent";
import { emotionGetController } from "./emotion";
import { sseGetController, ssePostController } from "./mcp";
import { memoriesGetController } from "./memories";
import { askModelController } from "./models";
import { textToSpeechController } from "./voice";

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Middleware for processing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Endpoint for establishing SSE (Server-Sent Events) connection.
 * Allows real-time communication from server to client.
 * @route GET /sse
 */
app.get("/sse", sseGetController);

/**
 * Endpoint for receiving messages through the SSE connection.
 * @route POST /sse
 */
app.post("/sse", ssePostController);

/**
 * Endpoint for converting text to speech.
 * @route POST /say
 * @param {Object} req.body - Request body
 * @param {string} req.body.text - Text to convert to speech
 */
app.post("/say", textToSpeechController);

/**
 * Endpoint for sending questions directly to the language model.
 * @route POST /ask
 * @param {Object} req.body - Request body
 * @param {string} req.body.question - Question to process
 */
app.post("/ask", askModelController);

/**
 * Endpoint for interacting with the Esperanza agent.
 * @route POST /agent
 * @param {Object} req.body - Request body
 * @param {string} req.body.question - Question for the agent
 */
app.post("/agent", agentController);

/**
 * Endpoint for retrieving the current emotional state of the agent.
 * @route GET /emotion
 */
app.get("/emotion", emotionGetController);

/**
 * Endpoint for retrieving memories stored by the agent.
 * @route GET /memories
 */
app.get("/memories", memoriesGetController);

app.get("/", (req, res) => {
  res.send("Esperanza is running!");
});

/**
 * Starts the server on the specified port.
 * @returns {void}
 */
export const startServer = (): void => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
};
