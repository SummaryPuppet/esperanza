import { eq } from "drizzle-orm";
import { MySqlColumn, MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { db } from "./connection";

export const insert = async (
  table: MySqlTableWithColumns<any>,
  values: any
) => {
  await db.insert(table).values(values);
};

export const select = async (
  table: MySqlTableWithColumns<any>,
  idTable: MySqlColumn<any>,
  id: number | null
) => {
  if (id) {
    return await db.select().from(table).where(eq(idTable, id!));
  }

  return await db.select().from(table);
};
