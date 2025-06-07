FROM ghcr.io/coqui-ai/tts-cpu

ENV COQUI_TOS_AGREED=1

EXPOSE 5002

ENTRYPOINT [ "python3" ]

CMD [  "TTS/server/server.py", "--model_name", "tts_models/es/css10/vits", "--port","5002"]