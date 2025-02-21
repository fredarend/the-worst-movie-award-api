import app from "./app";
import processCSV from "./config/processCSV";
import configDB from "./config/database";

const server = async () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  await configDB();
  await processCSV.run();

  console.log("Setup completed!");
};

server();
