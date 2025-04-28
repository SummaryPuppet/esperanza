import { Router } from "express";
import { textToSpeechController } from "../controllers/voice.controller";

const router = Router();

/**
 * Endpoint for converting text to speech.
 * @route POST /say
 * @param {Object} req.body - Request body
 * @param {string} req.body.text - Text to convert to speech
 */
router.post("/say", textToSpeechController);

export default router;
