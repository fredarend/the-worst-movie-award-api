import createHttpError from "http-errors";
import { AwardsProducersModel } from "../models/awardsProducers.model";
import { IAwardsProducersInsertAll } from "../types";

export class AwardsProducersRepository {
  model: typeof AwardsProducersModel;

  constructor() {
    this.model = AwardsProducersModel;
  }

  async insertAll(awardsProducers: IAwardsProducersInsertAll[]) {
    try {
      for (const awardProducer of awardsProducers) {
        await this.model.query().insert(awardProducer);
      }
    } catch (error) {
      console.error(
        "Error inserting awards producers into the database:",
        error
      );
      throw createHttpError(
        500,
        "Error inserting awards producers into the database"
      );
    }
  }
}
