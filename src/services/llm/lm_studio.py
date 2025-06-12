from openai import OpenAI
from dotenv import load_dotenv

import os
import json


class LM_Studio:
    model: str
    client: OpenAI

    def __init__(self):
        load_dotenv()

        key = os.getenv("LM_STUDIO_API_KEY")
        url = os.getenv("LM_STUDIO_API_URL")
        self.model = os.getenv("LM_STUDIO_MODEL")

        self.client = OpenAI(
            api_key=key,
            base_url=url,
        )

    def process_text(self, text: str):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": text
                }
            ]
        )

        return response.choices[0].message.content

    def process_function(self, text: str, tools: list):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": text
                }
            ],
            functions=tools,
            function_call="auto"
        )

        message = response["choices"][0]["message"]

        if message.get("function_call"):
            function_name = message["function_call"]["name"]
            args = message["function_call"]["arguments"]

            args = json.loads(args)

            return function_name, args, message

        return None, None, message
