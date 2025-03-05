import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/container";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});

const app = server.build();

export default app;
