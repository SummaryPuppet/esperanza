import { Request, Response } from "express";
import { Agent } from "../../../services/agent/Agent";
import { textToSpeech } from "../../../services/voice";

export const agentController = async (req: Request, res: Response) => {
  const { question } = req.body;

  const agent = Agent.getInstance();

  const answer = await agent.think(question);
  textToSpeech(answer);

  res.json({
    message: `Question received: ${question}`,
    answer,
    status: "success",
  });
};
