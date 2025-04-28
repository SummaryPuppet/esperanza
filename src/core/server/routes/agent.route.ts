import { Router } from "express";

import { agentController } from "../controllers/agent.controller";
const router = Router();

/**
 * Endpoint for interacting with the Esperanza agent.
 * @route POST /agent
 * @param {Object} req.body - Request body
 * @param {string} req.body.question - Question for the agent
 */
router.post("/agent", agentController);

export default router;
