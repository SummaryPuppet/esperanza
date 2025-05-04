import { ElevenLabsClient, play } from "elevenlabs";

export async function textToSpeech(text: string) {
  const client = new ElevenLabsClient();
  const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
    text,
    model_id: "eleven_multilingual_v2",
    output_format: "mp3_44100_128",
  });
  await play(audio);
}
