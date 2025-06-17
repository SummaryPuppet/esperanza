from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse

import os
import logging

from ..services.llm.lm_studio import LM_Studio
from ..services.transcriber import Transcriber
from ..services.tts import TTS
from ..utils.save_file import save_audio
from ..utils.clean_text import clean_llm_response

logging.basicConfig(level=logging.INFO)

router = APIRouter()

UPLOAD_DIR = "/tmp/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/llm-audio")
async def get_audio(
    file: UploadFile
):
    try:
        file_path = save_audio(file)
        transcriber = Transcriber()

        text_user = transcriber.transcribe(file_path)
        logging.info("Transcriber text: %s", text_user)

        llm = LM_Studio()
        logging.info("Start LLM processing")
        response_llm = llm.process_text(text_user)

        response_llm_clean = clean_llm_response(response_llm)

        tts = TTS()
        output_path = tts.synthezize(response_llm_clean)

        return {"message": "ok", "outputPath": output_path, "response": response_llm}
    except Exception as e:
        print("Exception in /llm-audio: " + str(e))
        return JSONResponse(status_code=500, content={"error": "In server"})
