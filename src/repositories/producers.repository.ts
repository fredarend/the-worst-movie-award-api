import { Model } from "objection";
import { ProducersModel } from "../models/producers.model";
import { IProducersInsertAll } from "../types/producers.types";
import createHttpError from "http-errors";

export class ProducersRepository {
  model: typeof Model;

  constructor() {
    this.model = ProducersModel;
  }

  async insertAll(producers: IProducersInsertAll[]) {
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
