export interface ConversationContext {
  topic: string;
  lastUserMessage: string;
  lastAgentResponse: string;
  mood: string;
  timestamp: number;
}

export class ContextManager {
  private context: ConversationContext = {
    topic: "",
    lastUserMessage: "",
    lastAgentResponse: "",
    mood: "neutral",
    timestamp: Date.now(),
  };

  getContext(): ConversationContext {
    return this.context;
  }

  updateContext(newContext: Partial<ConversationContext>) {
    this.context = { ...this.context, ...newContext, timestamp: Date.now() };
  }

  resetContext() {
    this.context = {
      topic: "",
      lastUserMessage: "",
      lastAgentResponse: "",
      mood: "neutral",
      timestamp: Date.now(),
    };
  }
}
