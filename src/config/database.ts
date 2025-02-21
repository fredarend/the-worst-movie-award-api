import Knex from "knex";
import { Model } from "objection";
import path from "path";

export default async () => {
  const db = Knex({
    client: "sqlite3",
    connection: {
      filename: ":memory:",
      // filename: "./dev.sqlite",
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "migrations",
      directory: path.join(__dirname, "../migrations"),
    },
  });

  Model.knex(db);

  await db.migrate.latest();
  console.log("Migrations ran successfully!");
};
