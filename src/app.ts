import express from "express";

import awardsRoutes from "./routes/awards.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use("/api", awardsRoutes);
app.use(errorHandler);

export default app;
