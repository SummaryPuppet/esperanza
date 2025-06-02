import { OpenAI } from "openai";

export const model = process.env.LLM_STUDIO_MODEL || "hermes-2-pro-mistral-7b";

export const client = new OpenAI({
  apiKey: process.env.LM_STUDIO_API_KEY || "lm-studio",
  baseURL:
    process.env.LM_STUDIO_API_URL || "http://host.docker.internal:1234/v1",
});
