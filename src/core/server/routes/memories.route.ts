import { Router } from "express";
import { memoriesGetController } from "../controllers/memories.controller";

const router = Router();

/**
 * Endpoint for retrieving memories stored by the agent.
 * @route GET /memories
 */
router.get("/memories", memoriesGetController);

export default router;
