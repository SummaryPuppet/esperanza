// import { Memory } from "../../types/Memory";
import { insert, select } from "../orm";
import { memorias } from "../schema";

type newMemory = typeof memorias.$inferInsert;

export const insertMemory = async (memory: newMemory) => {
  await insert(memorias, memory);
};

export const getMemories = async ({
  id,
}: {
  id: number | null;
}): Promise<newMemory[]> => {
  return await select(memorias, memorias.id_memoria, id);
};
