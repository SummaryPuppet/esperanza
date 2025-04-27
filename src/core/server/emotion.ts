import { Request, Response } from "express";
import { EmotionService } from "../../services/emotion";

export const emotionGetController = async (_: Request, res: Response) => {
  const emotionService = EmotionService.getInstance();
  const currentEmotion = emotionService.getEmotion();

  res.json({
    message: `Current emotion: ${currentEmotion}`,
    status: "success",
  });
};
