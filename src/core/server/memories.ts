import { Request, Response } from "express";
import { MemoryManager } from "../../services/memories";

export const memoriesGetController = async (_: Request, res: Response) => {
  const memoryManager = new MemoryManager();
  const memories = await memoryManager.getMemories();

  res.json({
    message: "Memories retrieved successfully",
    status: "success",
    data: memories,
  });
};
