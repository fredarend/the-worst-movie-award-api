import express from "express";

import { setupDatabase } from "./config";

const app = express();

app.use(express.json());

setupDatabase();

export default app;
