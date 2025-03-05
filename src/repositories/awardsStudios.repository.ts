import createHttpError from "http-errors";
import { injectable } from "inversify";

import { AwardsStudiosModel } from "../models/awardsStudios.model";
import { IAwardsStudiosInsertAll } from "../types";
import { IAwardsStudiosRepository } from "./interfaces";

@injectable()
export class AwardsStudiosRepository implements IAwardsStudiosRepository {
  private readonly model: typeof AwardsStudiosModel;

  constructor() {
    this.model = AwardsStudiosModel;
  }

  async insertAll(awardsStudios: IAwardsStudiosInsertAll[]): Promise<void> {
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
