import Database from "better-sqlite3";
import fs from "fs";
import { join } from "path";

const dbPath = join(__dirname, "esperanza.sqlite");
const db = new Database(dbPath);

const schemaPath = join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema);

export default db;
