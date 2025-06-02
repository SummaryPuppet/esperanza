import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "esperanza_root",
    database: "esperanza_db",
    port: 3306,
  },
});
