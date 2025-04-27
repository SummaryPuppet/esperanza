/**
 * @fileoverview Memory management system for the Esperanza agent.
 * @module services/memories
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Priority } from "../../shared/priority";

/**
 * Interface that defines the structure of a memory.
 * @interface Memory
 */
export interface Memory {
  /** Unique identifier for the memory */
  id: string;
  /** Textual content of the memory */
  content: string;
  /** Creation timestamp in milliseconds */
  timestamp: number;
  /** Memory type based on its origin */
  type: "user" | "agent" | "system";
  /** Priority level of the memory */
  priority: Priority;
  /** Tags for classification and search */
  tags: string[];
}

/** Path to the file where memories are stored */
const MEMORY_FILE = "./data/memories.json";

/**
 * Class responsible for managing the agent's memories.
 * Allows storing, retrieving, and searching relevant memories.
 * @class MemoryManager
 */
export class MemoryManager {
  private memories: Memory[] = [];

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
      const data = await readFile(MEMORY_FILE, "utf-8");
      this.memories = JSON.parse(data) as Memory[];
    } catch (error) {
      console.warn("No memories loaded, starting fresh.");
      this.memories = [];
    }
  }

  /**
   * Saves memories to the storage file.
   * @returns {Promise<void>}
   * @private
   */
  private async saveMemories(): Promise<void> {
    try {
      await mkdir("./data", { recursive: true });
      await writeFile(
        MEMORY_FILE,
        JSON.stringify(this.memories, null, 2),
        "utf-8"
      );
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
    await this.saveMemories();
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
