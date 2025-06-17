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

# CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "3000", "--reload"]
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "3000" ]