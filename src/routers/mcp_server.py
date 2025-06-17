from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse

from ..services.llm.lm_studio import LM_Studio
from ..services.transcriber import Transcriber
from ..services.tts import TTS
from ..services.model_context_protocol import MCP_CLIENT
from ..utils.save_file import save_audio
from ..utils.clean_text import clean_llm_response

import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)


@router.get("/available-tools")
async def list_tools():
    tools = MCP_CLIENT.all_tools

    return {
        "data": {
            "available_tools": tools
        }
    }


@router.post("/llm-tools")
async def llm_mcp_server(
    file: UploadFile
):
    try:
        file_path = save_audio(file)
        transcriber = Transcriber()

        text_user = transcriber.transcribe(file_path)
        logging.info("Transcriber text: %s", text_user)

        llm = LM_Studio()
        logging.info("Start LLM processing")
        function_name, args, message = llm.process_function(
            system="""<|im_start|>system
                You are a function calling AI model. You are provided with function signatures within <tools></tools> XML tags. You may call one or more functions to assist with the user query. Don't make assumptions about what values to plug into functions. Here are the available tools: <tools> ... </tools> Use the following pydantic model json schema for each tool call you will make: {'title': 'FunctionCall', 'type': 'object', 'properties': {'arguments': {'title': 'Arguments', 'type': 'object'}, 'name': {'title': 'Name', 'type': 'string'}}, 'required': ['arguments', 'name']} For each function call return a json object with function name and arguments within <tool_call></tool_call> XML tags as follows:
                <tool_call>
                {'arguments': <args-dict>, 'name': <function-name>}
                </tool_call><|im_end|>""",
            text=f"""<|im_start|>user
            {text_user}
            <|im_end|>
                """,
            tools=MCP_CLIENT.all_tools)

        response_llm_clean = clean_llm_response(message)

        for server in MCP_CLIENT.mcp_servers:
            tools = await server.list_tools()
            if any(tool["name"] == function_name for tool in tools):
                result = await server.execute_tool(
                    function_name, args
                )

                if isinstance(result, dict) and "progress" in result:
                    progress = result["progress"]
                    total = result["total"]
                    percentage = (progress / total) * 100
                    logging.info(
                        f"Progress: {progress}/{total} ({percentage:.1f}%)"
                    )

                items = result.content[0].text.strip().split('\n')
                response_llm_clean = clean_llm_response(items)

        tts = TTS()
        output_path = tts.synthezize(response_llm_clean)

        return {"message": "ok", "outputPath": output_path, "response": response_llm_clean}
    except Exception as e:
        print("Exception in /llm-audio: " + str(e))
        return JSONResponse(status_code=500, content={"error": "In server"})


@router.post("/llm-tools-only-text")
async def llm_mcp_server(
    text_user: str
):
    try:
        print(f"text_user: {text_user}")

        llm = LM_Studio()
        logging.info("Start LLM processing")
        function_name, args, message = llm.process_function(
            text=f"""<|im_start|>user
            {text_user}
            <|im_end|>
                """,
            tools=MCP_CLIENT.all_tools)

        for server in MCP_CLIENT.mcp_servers:
            tools = await server.list_tools()
            if any(tool["name"] == function_name for tool in tools):
                result = await server.execute_tool(
                    function_name, args
                )

                if isinstance(result, dict) and "progress" in result:
                    progress = result["progress"]
                    total = result["total"]
                    percentage = (progress / total) * 100
                    logging.info(
                        f"Progress: {progress}/{total} ({percentage:.1f}%)"
                    )

                items = result.content[0].text.strip().split('\n')

                return {
                    "message": "ok",
                    "response": f"\n" + "\n".join(items)
                }

        return {
            "message": "no excuting tool",
            "response": message.content
        }
    except Exception as e:
        print("Exception in /llm-audio: " + str(e))
        return JSONResponse(status_code=500, content={"error": "In server"})
