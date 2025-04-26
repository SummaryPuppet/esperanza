import { askModel as askModelLlmStudio } from "./lmStudio";
import { askModel as askModelOpenai } from "./openai";

const modelProvider = process.env.MODEL_PROVIDER || "lm-studio";

export async function askModel(question: string): Promise<string> {
  if (modelProvider === "lm-studio") {
    return await askModelLlmStudio(question);
  }

  if (modelProvider === "openai") {
    return await askModelOpenai(question);
  }

  return "";
}
