import { db } from ".";

export const setupDatabase = async () => {
  try {
    await db.migrate.latest();
    console.log("Migrations applied!");

    const tables = await db.raw(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log("Tables:", tables);
  } catch (error) {
    console.log("Error setting up database: ", error);
  }
};
