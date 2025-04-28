import { Router } from "express";
import { emotionGetController } from "../controllers/emotion.controller";

const router = Router();

/**
 * Endpoint for retrieving the current emotional state of the agent.
 * @route GET /emotion
 */
router.get("/emotion", emotionGetController);

export default router;
