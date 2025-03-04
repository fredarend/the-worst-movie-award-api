import createHttpError from "http-errors";
import { StudiosModel } from "../models/studios.model";
import { IStudiosInsertAll } from "../types/studios.types";

export class StudiosRepository {
  model: typeof StudiosModel;

  constructor() {
    this.model = StudiosModel;
  }

  async insertAll(studios: IStudiosInsertAll[]) {
    try {
      for (const studio of studios) {
        await this.model.query().insert(studio);
      }
    } catch (error) {
      console.error("Error inserting studios ino the database:", error);
      throw createHttpError(500, "Error inserting studios into the database");
    }
  }
}
