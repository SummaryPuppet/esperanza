import say from "say";

export function textToSpeech(text: string) {
  say.speak(text);
}
