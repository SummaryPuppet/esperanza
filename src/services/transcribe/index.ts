import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";
import path from "node:path";

const WHISPER_SERVICE_URL = "http://whisper-service:8080/inference";

export const transcribeAudioWav = async (wavPath: string) => {
  const formData = new FormData();

  const fileStream = fs.createReadStream(wavPath);
  formData.append("file", fileStream, {
    filename: path.basename(wavPath),
    contentType: "audio/wav",
  });

  const response = await axios.post(WHISPER_SERVICE_URL, formData, {
    headers: formData.getHeaders(),
    responseType: "json",
    timeout: 60000,
  });

  await fs.promises.unlink(wavPath);

  return response.data.text || "Transcription failed or no text returned.";
};
