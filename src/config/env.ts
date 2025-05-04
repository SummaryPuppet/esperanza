import { z } from "zod";

const envVars = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  MODEL_PROVIDER: z.enum(["openai", "lm-studio"]).default("openai"),
  OPENAI_API_KEY: z.string().optional(),
  LM_STUDIO_API_URL: z.string().url().optional(),
  LM_STUDIO_MODEL: z.string().optional(),
  VOICE_PROVIDER: z.enum(["elevenlabs", "say"]).default("say"),
  ELEVENLABS_API_KEY: z.string().optional(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
