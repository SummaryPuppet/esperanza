
from fastapi import UploadFile

import os
import shutil
import logging

logging.basicConfig(level=logging.INFO)


def save_audio(file: UploadFile, upload_dir="/tmp/uploads"):
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    logging.info("Saving file to: %s", os.path.abspath(file_path))

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path
