import { insert, select } from "../orm";
import { personas } from "../schema";

type newPerson = typeof personas.$inferInsert;

export const insertPerson = async (person: newPerson) => {
  await insert(personas, person);
};

export const getPersons = async ({
  id,
}: {
  id: number | null;
}): Promise<{ [x: string]: any }[]> => {
  return id
    ? await select(personas, personas.id_persona, id)
    : await select(personas, personas.id_persona, null);
};
