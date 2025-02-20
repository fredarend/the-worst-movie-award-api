import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("year").notNullable();
    table.boolean("winner").notNullable();
    table.integer("studio_id").unsigned().notNullable();
    table.foreign("studio_id").references("id").inTable("studios");
    table.integer("producer_id").unsigned().notNullable();
    table.foreign("producer_id").references("id").inTable("producers");
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("movies");
};
