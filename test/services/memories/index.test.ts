import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Memory, MemoryManager } from "../../../src/services/memories";

// Mock fs functions
jest.mock("node:fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn().mockResolvedValue(undefined),
  mkdir: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mock-uuid"),
}));

describe("MemoryManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty memories when file does not exist", async () => {
    (readFile as jest.Mock).mockRejectedValueOnce(new Error("File not found"));

    const manager = new MemoryManager();
    // We need to wait for the constructor's async operation
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(manager.getMemories()).toEqual([]);
  });

  it("should load memories from file when it exists", async () => {
    const mockMemories: Memory[] = [
      {
        id: "test-id",
        content: "Test memory",
        timestamp: 1234567890,
        type: "user",
        priority: "medium",
        tags: ["test"],
      },
    ];

    (readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockMemories));

    const manager = new MemoryManager();
    // Wait for async constructor
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(manager.getMemories()).toEqual(mockMemories);
  });

  it("should add a new memory and save to file", async () => {
    (readFile as jest.Mock).mockRejectedValueOnce(new Error("File not found"));

    const manager = new MemoryManager();
    // Wait for async constructor
    await new Promise((resolve) => setTimeout(resolve, 0));

    const now = Date.now();
    jest.spyOn(Date, "now").mockReturnValue(now);

    await manager.addMemory("New memory", "user", "high", ["important"]);

    expect(manager.getMemories()).toEqual([
      {
        id: "mock-uuid",
        content: "New memory",
        timestamp: now,
        type: "user",
        priority: "high",
        tags: ["important"],
      },
    ]);

    expect(mkdir).toHaveBeenCalledWith("./data", { recursive: true });
    expect(writeFile).toHaveBeenCalledWith(
      "./data/memories.json",
      JSON.stringify(manager.getMemories(), null, 2),
      "utf-8"
    );
  });

  it("should find relevant memories by tags", async () => {
    const mockMemories: Memory[] = [
      {
        id: "test-id-1",
        content: "Birthday memory",
        timestamp: 1234567890,
        type: "user",
        priority: "high",
        tags: ["cumpleaños", "personal"],
      },
      {
        id: "test-id-2",
        content: "Work memory",
        timestamp: 1234567891,
        type: "user",
        priority: "medium",
        tags: ["trabajo", "profesional"],
      },
    ];

    (readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockMemories));

    const manager = new MemoryManager();
    // Wait for async constructor
    await new Promise((resolve) => setTimeout(resolve, 0));

    const relevantMemories = manager.findRelevantMemories(
      "Te quería preguntar algo sobre mi cumpleaños"
    );

    expect(relevantMemories).toEqual([mockMemories[0]]);
  });
});
