import { Request, Response } from "express";
import { textToSpeech } from "../../services/voice";

export const textToSpeechController = (req: Request, res: Response) => {
  const { text } = req.body;

  textToSpeech(text);

  res.json({
    message: `Text to speech for ${text} started`,
    status: "success",
  });
};
