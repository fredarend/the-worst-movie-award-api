import app from "./app";
import processCSV from "./config/processCSV";
import configDB from "./config/database";
import { container } from "./config/container";
import { TYPES } from "./types";
import ProcessCSV from "./config/processCSV";

const server = async () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  await configDB();

  const processCSV = container.get<ProcessCSV>(TYPES.ProcessCSV);
  await processCSV.run();

  console.log("Setup completed!");
};

server();
