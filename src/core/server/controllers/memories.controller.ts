import { RequestHandler } from "express";
import { MemoryManager } from "../../../services/memories";

export const memoriesGetController: RequestHandler = async (_, res) => {
  const memoryManager = MemoryManager.getInstance();
  const memories = memoryManager.getMemories();

  res.json({
    message: "Memories retrieved successfully",
    status: "success",
    data: memories,
  });
};
