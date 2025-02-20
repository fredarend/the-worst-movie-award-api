import knex from "knex";
import path from "path";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite",
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "migrations",
    directory: path.join(__dirname, "../migrations"),
  },
});
