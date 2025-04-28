import { RequestHandler } from "express";
import { z } from "zod";
import { textToSpeech } from "../../../services/voice";

const textToSpeechSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

export const textToSpeechController: RequestHandler = (req, res, next) => {
  try {
    const { text } = textToSpeechSchema.parse(req.body);
    textToSpeech(text);

    res.json({
      message: `Text to speech for ${text} started`,
      status: "success",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid input",
        status: "error",
      });
      return;
    }
    next(error);
  }
};
