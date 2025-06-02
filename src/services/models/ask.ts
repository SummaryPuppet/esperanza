import { Tool } from "@/types/Tool";
import OpenAI from "openai";
import { toolsFunctions } from "../tools";

interface AskMOptions {
  question: string;
  systemContent?: string;
  tools?: Tool[];
  client: OpenAI;
  model: string;
}

export async function askModel({
  question,
  systemContent = "You are a helpful assistant.",
  tools = [],
  client,
  model,
}: AskMOptions): Promise<string> {
  if (!question) {
    throw new Error("Question cannot be empty.");
  }

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: question },
      ],
      tools,
      tool_choice: "auto",
    });

    if (response.choices[0].message.tool_calls) {
      const functionName: string =
        response.choices[0].message.tool_calls[0].function.name;
      const functionArgs = JSON.parse(
        response.choices[0].message.tool_calls[0].function.arguments
      );
      const res = await toolsFunctions[functionName](functionArgs);
      return res;
    }

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error in askModel:", error);
    throw new Error("Failed to get response from the model.");
  }
}
