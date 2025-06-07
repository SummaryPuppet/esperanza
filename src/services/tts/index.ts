import axios from "axios";
import FormData from "form-data";
import fs from "node:fs/promises";

const TTS_SERVICE_URL = "http://tts-service:5002/api/tts";

export const speakLocally = async (
  text: string,
  outputPath: string = "audios/output.wav"
): Promise<void> => {
  try {
    console.log("Starting TTS service with text:", text);
    console.log("Output path:", outputPath);

    const formData = new FormData();

    formData.append("text", text);
    const response = await axios.post(`${TTS_SERVICE_URL}`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 60000,
      responseType: "arraybuffer",
    });
    console.log(
      "Response from TTS service:",
      response.status,
      response.statusText
    );
    if (response.status !== 200) {
      throw new Error(`TTS service returned status ${response.status}`);
    }
    const audioBuffer = response.data;

    console.log("Audio buffer received, writing to file:", outputPath);
    await fs.writeFile(outputPath, audioBuffer, { flag: "w+" });
  } catch (error) {
    console.error("Error in speakLocally" + error);
  }
};
