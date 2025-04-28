import { Router } from "express";
import {
  sseGetController,
  ssePostController,
} from "../controllers/mcp.controller";

const router = Router();

/**
 * Endpoint for establishing SSE (Server-Sent Events) connection.
 * Allows real-time communication from server to client.
 * @route GET /sse
 */
router.get("/sse", sseGetController);

/**
 * Endpoint for receiving messages through the SSE connection.
 * @route POST /sse
 */
router.post("/sse", ssePostController);

export default router;
