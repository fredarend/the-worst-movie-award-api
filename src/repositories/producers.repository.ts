import { injectable } from "inversify";
import createHttpError from "http-errors";

import { ProducersModel } from "../models/producers.model";
import { IProducersInsertAll } from "../types/producers.types";
import { IProducersRepository } from "./interfaces";

@injectable()
export class ProducersRepository implements IProducersRepository {
  private readonly model: typeof ProducersModel;

  constructor() {
    this.model = ProducersModel;
  }

  async insertAll(producers: IProducersInsertAll[]): Promise<void> {
    try {
      for (const producer of producers) {
        await this.model.query().insert(producer);
      }
    } catch (error) {
      console.error("Error inserting producers into the database:", error);
      throw createHttpError(500, "Error inserting producers into the database");
    }
  }
}
