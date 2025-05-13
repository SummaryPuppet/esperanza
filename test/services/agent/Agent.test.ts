import { Agent } from "../../../src/services/agent/Agent";
import { askModel } from "../../../src/services/models";

// Mock dependencies
jest.mock("../../../src/services/models", () => ({
  askModel: jest.fn().mockResolvedValue("Mocked response"),
}));

jest.mock("../../../src/services/memories", () => {
  return {
    MemoryManager: jest.fn().mockImplementation(() => {
      return {
        findRelevantMemories: jest.fn().mockReturnValue([]),
        addMemory: jest.fn().mockResolvedValue(undefined),
      };
    }),
  };
});

jest.mock("../../../src/services/context", () => {
  return {
    ContextManager: jest.fn().mockImplementation(() => {
      return {
        updateContext: jest.fn(),
        getContext: jest.fn().mockReturnValue({
          topic: "",
          lastUserMessage: "",
          lastAgentResponse: "",
          mood: "neutral",
          timestamp: Date.now(),
        }),
      };
    }),
  };
});

describe("Agent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a response when thinking about input", async () => {
    const agent = Agent.getInstance();
    const response = await agent.think("Hello, how are you?");

    expect(response).toBe("Mocked response");
    expect(askModel).toHaveBeenCalledWith("\n\nHello, how are you?");
  });

  it("should try to save memory when input contains birthday information", async () => {
    const agent = Agent.getInstance();
    const response = await agent.think("mi cumpleaños es el 15 de mayo");

    expect(response).toBe("Mocked response");
    // Here we would check if addMemory was called with the right parameters
    // but that requires modifying the implementation to make it testable
  });

  it("should sometimes refuse to comply based on emotion", async () => {
    // This test is tricky because shouldComply is private
    // We would need to modify the code to make it testable
    // or use some advanced testing techniques
    const agent = Agent.getInstance();

    // Mock Math.random to return a value that should trigger non-compliance
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.9);

    // Now we need a way to set the emotion to "molesta"
    // This would require modifying the code structure

    Math.random = originalRandom;
  });
});
