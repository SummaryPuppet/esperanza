import requests
from dotenv import load_dotenv
import os


class TTS:
    url: str
    file_name: str = "output.wav"
    CHUNK_SIZE = 1024

    def __init__(self):
        load_dotenv()
        self.url = os.getenv("TTS_URL")
        print(self.url)

    def synthezize(self, text: str) -> str:
        """
        Synthesize the given text into speech.

        Args:
            text (str): The text to synthesize.

        Returns:
            str: The path to the synthesized audio file.
        """
        try:
            response = requests.post(
                url=self.url,
                headers={
                    "text": text
                },
                json={"text": text},
                timeout=6000
            )

            if response.status_code != 200:
                raise Exception(
                    f"TTS error: {response.status_code} - {response.text}")

            if not response.content:
                raise Exception("Empty audio content received from TTS")

            with open(f"/app/src/static/{self.file_name}", "wb") as f:
                for chunk in response.iter_content(chunk_size=self.CHUNK_SIZE):
                    if chunk:
                        f.write(chunk)

        except Exception as e:
            print("Error in TTS.synthezize: " + str(e))

        return self.file_name
