import { drizzle } from "drizzle-orm/mysql2";
import fs from "fs";
import mysql from "mysql2/promise";
import { join } from "path";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "esperanza_root",
  database: "esperanza_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle({ client: pool });

export const runSchema = async () => {
  try {
    const [rows] = await pool.query("SHOW TABLES");

    if ((rows as any[]).length > 0) {
      console.log("✅ La base de datos ya está inicializada.");
      return;
    }
    const schemaPath = join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    const statements = schema
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      await pool.query(statement);
    }

    console.log("✅ Base de datos inicializada desde schema.sql");
  } catch (error) {
    console.error("❌ Error ejecutando schema:", error);
  }
};
