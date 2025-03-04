import createHttpError from "http-errors";
import { AwardsStudiosModel } from "../models/awardsStudios.model";
import { IAwardsStudiosInsertAll } from "../types";

export class AwardsStudiosRepository {
  model: typeof AwardsStudiosModel;

  constructor() {
    this.model = AwardsStudiosModel;
  }

  async insertAll(awardsStudios: IAwardsStudiosInsertAll[]) {
    try {
      for (const awardStudio of awardsStudios) {
        await this.model.query().insert(awardStudio);
      }
    } catch (error) {
      console.error("Error inserting awards studios into the database:", error);
      throw createHttpError(
        500,
        "Error inserting awards studios into the database"
      );
    }
  }
}
