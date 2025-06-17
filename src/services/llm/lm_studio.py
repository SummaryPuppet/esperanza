from openai import OpenAI
from dotenv import load_dotenv
from typing import Any

import os
import json
import ast
import re


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

    def process_function(self, text: str, tools: list, system: str):
        system = """<|im_start|>system
            You are a function calling AI model. You are provided with function signatures within <tools></tools> XML tags. You may call one or more functions to assist with the user query. Don't make assumptions about what values to plug into functions. Here are the available tools: <tools> ... </tools> Use the following pydantic model json schema for each tool call you will make: {'title': 'FunctionCall', 'type': 'object', 'properties': {'arguments': {'title': 'Arguments', 'type': 'object'}, 'name': {'title': 'Name', 'type': 'string'}}, 'required': ['arguments', 'name']} For each function call return a json object with function name and arguments within <tool_call></tool_call> XML tags as follows:
            <tool_call>
            {'arguments': <args-dict>, 'name': <function-name>}
            </tool_call><|im_end|>""",

        text = f"""<|im_start|>user
            {text}
            <|im_end|>
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": system
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            functions=tools,
            function_call="auto"
        )

        print(f"RESPONSE: {response}")

        message = response.choices[0].message
        content = message.content or ""

        print("before if")

        match = re.search(
            r"<tool_call>\s*(\{.*?\})\s*</tool_call>", content, re.DOTALL)
        if match:
            tool_call_json = match.group(1)
            data = ast.literal_eval(tool_call_json)
            return data["name"], data["arguments"], message

        # if message.get("function_call"):
        #     function_name: str = message["function_call"]["name"]
        #     args = message["function_call"]["arguments"]

        #     args: dict[str, Any] = json.loads(args)

        #     print("before return in if")
        #     return function_name, args, message

        return None, None, message
