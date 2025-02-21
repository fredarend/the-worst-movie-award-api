import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("awards_producers", (table) => {
    table.increments("id").primary();
    table.integer("award_id").unsigned().notNullable();
    table.foreign("award_id").references("id").inTable("awards");
    table.integer("producer_id").unsigned().notNullable();
    table.foreign("producer_id").references("id").inTable("producers");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("awards_producers");
};
