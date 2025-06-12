FROM python:3.12-bookworm

RUN apt-get update && \
    apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*


EXPOSE 3000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

RUN mkdir -p /app/uploads

RUN adduser -u 5678 --disabled-password --gecos "" appuser

WORKDIR /app

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# CMD ["gunicorn", "--bind", "0.0.0.0:3000", "-k", "uvicorn.workers.UvicornWorker", "src.server\app:app"]
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "3000", "--reload"]
# CMD ["uvicorn", "src.server.app:app", "--host", "0.0.0.0", "--port", "3000", "--reload", "--reload-dir", "src"]