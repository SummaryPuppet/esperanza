import { OpenAI } from "openai";

const model = process.env.LLM_STUDIO_MODEL || "";

const lmStudio = new OpenAI({
  apiKey: process.env.LM_STUDIO_API_KEY || "lm-studio",
  baseURL: process.env.LM_STUDIO_API_URL || "http://localhost:1234/v1",
});

export async function askModel(question: string) {
  const response = await lmStudio.chat.completions.create({
    model,
    messages: [{ role: "user", content: question }],
  });

  return response.choices[0].message.content || "";
}
