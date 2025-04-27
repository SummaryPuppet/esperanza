# Esperanza - Conversational Assistant

Esperanza is a conversational assistant with personality and emotions, capable of maintaining contextual conversations, remembering important information, and responding in different styles based on her emotional state.

## Features

- 💬 Conversation interface through REST API
- 🧠 Persistent memory to remember important information
- 😀 Emotion system that affects response behavior
- 🗣️ Text-to-speech integration
- 🔄 Support for different language model providers (OpenAI, LM-Studio)
- 🎯 Goal and planning system

## Requirements

- Node.js 16+
- NPM or Yarn
- OpenAI API access (optional)
- LM-Studio installed locally (optional)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/esperanza.git
   cd esperanza
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Configuration

Esperanza can be configured through environment variables:

| Variable          | Description             | Possible Values       | Default Value              |
| ----------------- | ----------------------- | --------------------- | -------------------------- |
| SERVER_PORT       | Server port             | Any valid port        | 3000                       |
| MODEL_PROVIDER    | LLM provider            | "openai", "lm-studio" | "lm-studio"                |
| OPENAI_API_KEY    | OpenAI API key          | String                | -                          |
| LM_STUDIO_API_URL | LM-Studio API URL       | URL                   | "http://localhost:1234/v1" |
| LLM_STUDIO_MODEL  | Model name in LM-Studio | String                | -                          |

## Architecture

The project is structured in several modules:

- **core/server**: Express server configuration and controllers
- **services/agent**: Core agent logic
- **services/memories**: Persistent memory system
- **services/models**: Language model integration
- **services/voice**: Text-to-speech services
- **services/context**: Conversation context management

## REST API

### Main Endpoints

- `POST /ask`: Send a question to the language model

  ```json
  {
    "question": "How are you today?"
  }
  ```

- `POST /say`: Convert text to speech

  ```json
  {
    "text": "Hello, how are you?"
  }
  ```

- `POST /agent`: Interact with Esperanza agent

  ```json
  {
    "question": "What's your favorite color?"
  }
  ```

- `GET /sse`: Establish an SSE connection for real-time communication

## Development

### Directory Structure

```
src/
├── core/
│   └── server/       # Server configuration
├── services/         # Main services
│   ├── agent/        # Agent logic
│   ├── context/      # Context management
│   ├── memories/     # Memory system
│   ├── models/       # LLM integration
│   └── voice/        # Voice services
└── shared/           # Shared types and utilities
```

### Tests

To run tests:

```bash
npm test
```

For watching mode:

```bash
npm run test:watch
```

For coverage report:

```bash
npm run test:coverage
```

## Contributing

Contributions are welcome. Please make sure to add tests for any new functionality.

## License

[MIT](LICENSE)
