import requests
import os
from dotenv import load_dotenv


class Transcriber:
    url: str

    def __init__(self):
        load_dotenv()

        self.url = os.getenv("TRANSCRIBER_URL")

    def transcribe(self, audio_path):
        """
        Transcribe the given audio file using the specified model.

        :param audio_path: Path to the audio file to be transcribed.
        :return: Transcription of the audio file.
        """
        with open(audio_path, 'rb') as f:
            response = requests.post(
                url=self.url,
                files={'file': f},
                timeout=6000
            )

        if response.status_code == 200:
            os.remove(audio_path)

            return response.json().get('text', '')
        else:
            response.raise_for_status()
