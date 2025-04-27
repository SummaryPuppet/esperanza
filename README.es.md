# Esperanza - Asistente Conversacional

Esperanza es un asistente conversacional con personalidad y emociones, capaz de mantener conversaciones contextuales, recordar información importante y responder en diferentes estilos según su estado emocional.

## Características

- 💬 Interfaz de conversación mediante API REST
- 🧠 Memoria persistente para recordar información importante
- 😀 Sistema de emociones que afecta la forma de responder
- 🗣️ Integración con texto a voz
- 🔄 Soporte para diferentes proveedores de modelos de lenguaje (OpenAI, LM-Studio)
- 🎯 Sistema de objetivos y planificación

## Requisitos

- Node.js 16+
- NPM o Yarn
- Acceso a API de OpenAI (opcional)
- LM-Studio instalado localmente (opcional)

## Instalación

1. Clone el repositorio:

   ```bash
   git clone https://github.com/tuusuario/esperanza.git
   cd esperanza
   ```

2. Instale las dependencias:

   ```bash
   npm install
   ```

3. Configure las variables de entorno:

   ```bash
   cp .env.example .env
   # Edite .env con sus configuraciones
   ```

4. Inicie el servidor:
   ```bash
   npm start
   ```

## Configuración

Esperanza puede configurarse a través de variables de entorno:

| Variable          | Descripción                    | Valores posibles        | Valor por defecto          |
| ----------------- | ------------------------------ | ----------------------- | -------------------------- |
| SERVER_PORT       | Puerto del servidor            | Cualquier puerto válido | 3000                       |
| MODEL_PROVIDER    | Proveedor de modelos LLM       | "openai", "lm-studio"   | "lm-studio"                |
| OPENAI_API_KEY    | Clave API de OpenAI            | String                  | -                          |
| LM_STUDIO_API_URL | URL de la API de LM-Studio     | URL                     | "http://localhost:1234/v1" |
| LLM_STUDIO_MODEL  | Nombre del modelo en LM-Studio | String                  | -                          |

## Arquitectura

El proyecto está estructurado en varios módulos:

- **core/server**: Configuración del servidor Express y controladores
- **services/agent**: Lógica central del agente conversacional
- **services/memories**: Sistema de memoria persistente
- **services/models**: Integración con modelos de lenguaje
- **services/voice**: Servicios de texto a voz
- **services/context**: Gestión de contexto de conversación

## API REST

### Endpoints principales

- `POST /ask`: Envía una pregunta al modelo de lenguaje

  ```json
  {
    "question": "¿Cómo estás hoy?"
  }
  ```

- `POST /say`: Convierte texto a voz

  ```json
  {
    "text": "Hola, ¿cómo estás?"
  }
  ```

- `GET /sse`: Establece una conexión SSE para comunicación en tiempo real

## Desarrollo

### Estructura de directorios

```
src/
├── core/
│   └── server/       # Configuración del servidor
├── services/         # Servicios principales
│   ├── agent/        # Lógica del agente
│   ├── context/      # Gestión de contexto
│   ├── memories/     # Sistema de memoria
│   ├── models/       # Integración con LLMs
│   └── voice/        # Servicios de voz
└── shared/           # Tipos y utilidades compartidas
```

### Tests

Para ejecutar los tests:

```bash
npm test
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrese de añadir tests para cualquier nueva funcionalidad.

## Licencia

[MIT](LICENSE)
