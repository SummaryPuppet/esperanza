import { textToSpeech as textToSpeechElevenLabs } from "./elevenlabs";
import { textToSpeech as textToSpeechSay } from "./say";

export function textToSpeech(text: string) {
  const provider = process.env.VOICE_PROVIDER || "say";
  switch (provider) {
    case "elevenlabs":
      return textToSpeechElevenLabs(text);
    case "say":
      return textToSpeechSay(text);
    default:
      throw new Error(`Unsupported voice provider: ${provider}`);
  }
}
