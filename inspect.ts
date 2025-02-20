import db from "./src/config/database";

async function inspectDB() {
  const tables = await db.raw(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );
  console.log(tables);
}

inspectDB();
