import { transcribeAudioWav } from "@/services/transcribe";
import { Request, Response } from "express";

export const transcribePostController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No audio file uploaded." });
      return;
    }

    const audioFilePath = req.file.path;
    console.log(`Archivo de audio recibido: ${audioFilePath}`);

    const text = await transcribeAudioWav(audioFilePath);

    console.log(`Transcripción completada: ${text}`);

    res.status(200).json({ transcription: text });
  } catch (error) {
    console.error("Error in transcribePostController:", error);
    res.status(500).json({
      error: "An error occurred while processing the audio file.",
    });
  }
};
