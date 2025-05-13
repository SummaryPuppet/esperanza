/**
 * @fileoverview Memory management system for the Esperanza agent.
 * @module services/memories
 */

import {
  getAllMemories,
  insertMemory,
} from "@/db/repositories/memoryRespository";
import { v4 as uuidv4 } from "uuid";
import { Memory } from "../../types/Memory";
import { Priority } from "../../types/priority";

/**
 * Class responsible for managing the agent's memories.
 * Allows storing, retrieving, and searching relevant memories.
 * @class MemoryManager
 */
export class MemoryManager {
  private static instance: MemoryManager | null = null;
  private memories: Memory[] = [];

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  /**
   * Initializes the memory manager by loading data from file.
   * If the file doesn't exist, it starts with an empty memory.
   */
  constructor() {
    this.loadMemories().catch((error) => {
      console.error("Error loading memories:", error);
    });
  }

  /**
   * Loads memories from the storage file.
   * @returns {Promise<void>}
   * @private
   */
  private async loadMemories(): Promise<void> {
    try {
      const allMemories = getAllMemories();
      this.memories = allMemories;
    } catch (error) {
      console.warn("No memories loaded, starting fresh.");
      this.memories = [];
    }
  }

  /**
   * Saves memory in the database.
   * @returns {Promise<void>}
   * @private
   */
  private async saveMemory(): Promise<void> {
    try {
      const lastMemory = this.memories[this.memories.length - 1];
      insertMemory(lastMemory);
    } catch (error) {
      console.error("Error saving memories:", error);
    }
  }

  /**
   * Adds a new memory to the system.
   * @param {string} content - Memory content
   * @param {"user" | "agent" | "system"} type - Memory origin
   * @param {Priority} priority - Memory priority
   * @param {string[]} tags - Tags for classification
   * @returns {Promise<void>}
   */
  async addMemory(
    content: string,
    type: "user" | "agent" | "system",
    priority: Priority = "medium",
    tags: string[] = []
  ): Promise<void> {
    const memory: Memory = {
      id: uuidv4(),
      content,
      timestamp: Date.now(),
      type,
      priority,
      tags,
    };

    this.memories.push(memory);
    await this.saveMemory();
  }

  /**
   * Gets all stored memories.
   * @returns {Memory[]} Array with all memories
   */
  getMemories(): Memory[] {
    return this.memories;
  }

  /**
   * Finds a memory by its unique identifier.
   * @param {string} id - ID of the memory to find
   * @returns {Memory | undefined} The found memory or undefined
   */
  getMemoryById(id: string): Memory | undefined {
    return this.memories.find((memory) => memory.id === id);
  }

  /**
   * Finds relevant memories based on message content.
   * Looks for matches between tags and the message.
   * @param {string} message - Message to analyze
   * @returns {Memory[]} Array of relevant memories
   */
  findRelevantMemories(message: string): Memory[] {
    return this.memories.filter((memory) =>
      memory.tags.some((tag) => message.toLowerCase().includes(tag))
    );
  }
}
