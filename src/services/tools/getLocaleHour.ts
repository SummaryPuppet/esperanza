import { Tool } from "@/types/Tool";

export async function getLocaleHourFunction() {
  const date = new Date().toLocaleString();

  return date;
}

export const getLocaleHourTool: Tool = {
  type: "function",
  function: {
    name: "get_locale_hour",
    description: "Get the current local date and time.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
