import Knex from "knex";
import { Model } from "objection";
import path from "path";

export default async () => {
  const db = Knex({
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

  await db.migrate.latest();

  Model.knex(db);

  console.log("Migrations ran successfully!");
};
