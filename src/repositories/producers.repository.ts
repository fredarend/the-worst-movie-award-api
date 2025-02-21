import { Model } from "objection";
import { ProducersModel } from "../models/producers.model";
import { IProducersInsertAll } from "../types/producers.types";

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
      throw error;
    }
  }
}
