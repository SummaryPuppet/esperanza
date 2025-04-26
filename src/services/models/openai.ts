import { OpenAI } from "openai";

export async function askModel(question: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [{ role: "user", content: question }],
  });

  return response.choices[0].message.content || "";
}
