import { askModel } from "@/services/models";
import { transcribeAudioWav } from "@/services/transcribe";
import { speakLocally } from "@/services/tts";
import { Request, Response } from "express";
import path from "path";

export const llmAudioController = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No audio file uploaded." });
    return;
  }

  try {
    const audioFilePath = req.file.path;
    console.log(`Archivo de audio recibido: ${audioFilePath}`);

    const text = await transcribeAudioWav(audioFilePath);
    console.log(`Transcripción completada: ${text}`);

    const responseLLM = await askModel(text);
    console.log(`Respuesta del LLM: ${responseLLM}`);

    const outputPath = path.resolve(__dirname, "..", "public", "output.wav");
    await speakLocally(responseLLM, outputPath);

    res.status(200).json({
      message: "Audio processed successfully.",
      response: responseLLM,
      outputPath: "/output.wav",
    });
  } catch (error) {
    console.error("Error en llmAudioController:", error);
    res.status(500).json({ error: "Error processing audio file." });
    return;
  }
};
