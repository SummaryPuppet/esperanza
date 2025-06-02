import { getLocaleHourFunction, getLocaleHourTool } from "./getLocaleHour";

export const toolsFunctions: {
  [key: string]: (...args: any[]) => Promise<string>;
} = {
  get_locale_hour: getLocaleHourFunction,
  // Add more functions here as needed
  // Example:
  // anotherFunction: anotherFunction,
};

export const tools = [
  getLocaleHourTool,
  // Add more tools here as needed
  // Example:
  // anotherTool,
];

export type ToolsFunctions = typeof toolsFunctions;
