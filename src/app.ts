import express from "express";

import db from "./config/database";

const app = express();

app.use(express.json());

const setupDatabase = async () => {
  try {
    await db.migrate.latest();
    console.log("Migrations applied!");
  } catch (error) {
    console.log("Error setting up database: ", error);
  }
};

setupDatabase();

export default app;
