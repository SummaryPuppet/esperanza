import { Router } from "express";
import { llmAudioController } from "../controllers/llmAudio.controller";
import { upload } from "../storage";

const router = Router();

/**
 * @route POST /llm-audio
 */
router.post("/llm-audio", upload.single("audioFile"), llmAudioController);

export default router;
