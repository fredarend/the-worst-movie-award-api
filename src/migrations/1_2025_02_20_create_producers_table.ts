import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("producers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("producers");
};
