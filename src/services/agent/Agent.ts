import { ContextManager } from "../context";
import { MemoryManager } from "../memories";
import { askModel } from "../models";
import { EmotionService } from "./emotions";

export class Agent {
  private static instance: Agent | null = null;
  private emotions = new EmotionService();
  private context = new ContextManager();
  private memoryManager = new MemoryManager();

  public static getInstance(): Agent {
    if (this.instance === null) {
      this.instance = new Agent();
    }
    return this.instance;
  }

  private shouldComply(_: string): boolean {
    const mood = this.emotions.getEmotion();
    const random = Math.random();

    switch (mood) {
      case "feliz":
        return random > 0.1;
      case "neutral":
        return random > 0.4;
      case "triste":
        return random > 0.6;
      case "molesta":
        return random > 0.8;
      default:
        return true;
    }
  }

  public async think(input: string) {
    this.context.updateContext({ lastUserMessage: input });

    if (!this.shouldComply(input)) {
      return "Hoy no tengo ganas de hacerlo";
    }

    await this.tryToSaveMemory(input);

    const relevantMemories = this.memoryManager.findRelevantMemories(input);

    let memoryInfo = "";
    if (relevantMemories.length > 0) {
      memoryInfo = "Por cierto, recuerdo que: " + relevantMemories[0].content;
    }

    const response = await askModel(`${memoryInfo}\n${input}`);

    this.context.updateContext({ lastAgentResponse: response });

    return response;
  }

  private async tryToSaveMemory(message: string) {
    if (message.toLowerCase().includes("mi cumpleaños es")) {
      await this.memoryManager.addMemory(
        `Cumpleaños del usuario: ${message}`,
        "user",
        "high",
        ["cumpleaños", "personal"]
      );
    }
  }
}
