import knex from "knex";
import path from "path";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "migrations",
    directory: path.join(__dirname, "../migrations"),
  },
});

export default db;
