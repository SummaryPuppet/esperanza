/**
 * @fileoverview Main module for the Esperanza agent that handles conversation logic.
 * @module services/agent/Agent
 */

import { ContextManager } from "../context";
import { EmotionService } from "../emotion";
import { MemoryManager } from "../memories";
import { askModel } from "../models";

/**
 * Main class for the Esperanza conversational agent.
 * Implements the Singleton pattern to ensure a single instance.
 * Coordinates message processing, emotion management, memory, and context.
 *
 * @class Agent
 */
export class Agent {
  private static instance: Agent | null = null;
  private emotions = new EmotionService();
  private context = new ContextManager();
  private memoryManager = new MemoryManager();

  /**
   * Gets the singleton instance of the agent.
   * @returns {Agent} The single agent instance.
   */
  public static getInstance(): Agent {
    if (this.instance === null) {
      this.instance = new Agent();
    }
    return this.instance;
  }

  /**
   * Determines if the agent should respond to the message based on its emotional state.
   * @param {string} _ - Input message (not currently used).
   * @returns {boolean} True if the agent should respond, false if it should ignore the request.
   * @private
   */
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

  /**
   * Processes an input message, updates the context, and generates a response.
   * @param {string} input - User input message.
   * @returns {Promise<string>} Promise that resolves to the agent's response.
   */
  public async think(input: string): Promise<string> {
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

  /**
   * Attempts to save relevant information from the message as a memory.
   * Currently only saves information related to birthdays.
   * @param {string} message - Message to analyze.
   * @returns {Promise<void>}
   * @private
   */
  private async tryToSaveMemory(message: string): Promise<void> {
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
