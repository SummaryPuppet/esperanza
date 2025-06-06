FROM ubuntu:22.04 

WORKDIR /app
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    wget \
    curl \
    libsdl2-dev \
    ffmpeg \
    cmake \
    libstdc++-12-dev \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/ggerganov/whisper.cpp.git

WORKDIR /app/whisper.cpp
RUN set -e
RUN make -j

RUN ./models/download-ggml-model.sh base

EXPOSE 8080

# CMD ["./build/bin/whisper-server", "--convert"]
CMD ["./build/bin/whisper-server", "--host", "0.0.0.0", "--port", "8080", "--convert", "--language", "auto", "--model", "models/ggml-base.bin"]