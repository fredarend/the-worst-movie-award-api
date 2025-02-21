import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("awards", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("year").notNullable();
    table.boolean("winner").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("awards");
};
