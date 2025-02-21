import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("awards_studios", (table) => {
    table.increments("id").primary();
    table.integer("award_id").unsigned().notNullable();
    table.foreign("award_id").references("id").inTable("awards");
    table.integer("studio_id").unsigned().notNullable();
    table.foreign("studio_id").references("id").inTable("studios");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("awards_studios");
};
