import createHttpError from "http-errors";
import { injectable } from "inversify";

import { StudiosModel } from "../models/studios.model";
import { IStudiosInsertAll } from "../types/studios.types";
import { IStudiosRepository } from "./interfaces";

@injectable()
export class StudiosRepository implements IStudiosRepository {
  private readonly model: typeof StudiosModel;

  constructor() {
    this.model = StudiosModel;
  }

  async insertAll(studios: IStudiosInsertAll[]): Promise<void> {
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
