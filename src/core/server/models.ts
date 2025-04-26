import { Request, Response } from "express";
import { askModel } from "../../services/models";

export const askModelController = async (req: Request, res: Response) => {
  const { question } = req.body;

  try {
    const answer = await askModel(question);

    res.json({
      message: `Question received: ${question}`,
      answer,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error processing question: ${question}`,
    });
  }
};
