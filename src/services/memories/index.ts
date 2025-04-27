import { mkdir, readFile, writeFile } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Priority } from "../../shared/priority";

export interface Memory {
  id: string;
  content: string;
  timestamp: number;
  type: "user" | "agent" | "system";
  priority: Priority;
  tags: string[];
}

const MEMORY_FILE = "./data/memories.json";

export class MemoryManager {
  private memories: Memory[] = [];

  constructor() {
    this.loadMemories().catch((error) => {
      console.error("Error loading memories:", error);
    });
  }

  private async loadMemories() {
    try {
      const data = await readFile(MEMORY_FILE, "utf-8");
      this.memories = JSON.parse(data) as Memory[];
    } catch (error) {
      console.warn("No memories loaded, starting fresh.");
      this.memories = [];
    }
  }

  private async saveMemories() {
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

  async addMemory(
    content: string,
    type: "user" | "agent" | "system",
    priority: Priority = "medium",
    tags: string[] = []
  ) {
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

  getMemories(): Memory[] {
    return this.memories;
  }

  getMemoryById(id: string): Memory | undefined {
    return this.memories.find((memory) => memory.id === id);
  }

  findRelevantMemories(message: string): Memory[] {
    return this.memories.filter((memory) =>
      memory.tags.some((tag) => message.toLowerCase().includes(tag))
    );
  }
}
