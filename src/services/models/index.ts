import { Tool } from "@/types/Tool";
import { askModel as askM } from "./ask";
import { client as clientLlStudio, model as modelLmStudio } from "./lmStudio";
import { client as clientOpenai, model as modelOpenai } from "./openai";

const modelProvider = process.env.MODEL_PROVIDER || "lm-studio";

export async function askModel(question: string): Promise<string> {
  if (modelProvider === "lm-studio") {
    return await askM({
      question,
      client: clientLlStudio,
      model: modelLmStudio,
    });
  }

  if (modelProvider === "openai") {
    return await askM({
      question,
      client: clientOpenai,
      model: modelOpenai,
    });
  }

  return "";
}

export async function askModelWithSystemContent(
  question: string,
  systemContent: string
): Promise<string> {
  if (modelProvider === "lm-studio") {
    return await askM({
      question,
      systemContent,
      client: clientLlStudio,
      model: modelLmStudio,
    });
  }

  if (modelProvider === "openai") {
    return await askM({
      question,
      systemContent,
      client: clientOpenai,
      model: modelOpenai,
    });
  }

  return "";
}

export async function askModelWithTools(
  question: string,
  systemContent: string,
  tools: Tool[]
): Promise<string> {
  if (modelProvider === "lm-studio") {
    return await askM({
      question,
      systemContent,
      client: clientLlStudio,
      model: modelLmStudio,
      tools,
    });
  }

  if (modelProvider === "openai") {
    return await askM({
      question,
      systemContent,
      client: clientOpenai,
      model: modelOpenai,
      tools,
    });
  }

  return "";
}
