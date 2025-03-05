import app from "./app";

import configDB from "./config/database";
import { container } from "./config/container";

import ProcessCSV from "./data/processors/processCSV.processor";

import { TYPES } from "./types";

const server = async () => {
  try {
    await configDB();

    const processCSV = container.get<ProcessCSV>(TYPES.ProcessCSV);
    await processCSV.run();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    console.log("Setup completed!");
  } catch (error) {
    console.error("Error initializing server.");
    process.exit(1);
  }
};

server();
