import { Memory } from "../../types/Memory";
import db from "../connection";

export const insertMemory = (memory: Memory) => {
  const stmt = db.prepare(`
    INSERT INTO memories (id, content, type, priority, tags, timestamp)
    VALUES (@id, @content, @type, @priority, @tags, @timestamp)
  `);
  stmt.run(memory);
};

export const getAllMemories = (): Memory[] => {
  const allMemories = db
    .prepare("SELECT * FROM memories ORDER BY timestamp DESC")
    .all() as Memory[];

  return allMemories;
};

export const getMemoryById = (id: string): Memory | undefined => {
  const memoryById = db
    .prepare("SELECT * FROM memories WHERE id = ?")
    .get(id) as Memory | undefined;

  return memoryById;
};
