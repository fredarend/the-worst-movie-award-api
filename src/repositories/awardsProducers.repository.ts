import createHttpError from "http-errors";
import { injectable } from "inversify";

import { AwardsProducersModel } from "../models/awardsProducers.model";
import { IAwardsProducersInsertAll } from "../types";
import { IAwardsProducersRepository } from "./interfaces";

@injectable()
export class AwardsProducersRepository implements IAwardsProducersRepository {
  private readonly model: typeof AwardsProducersModel;

  constructor() {
    this.model = AwardsProducersModel;
  }

  async insertAll(awardsProducers: IAwardsProducersInsertAll[]): Promise<void> {
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
