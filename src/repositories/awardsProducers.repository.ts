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
      throw error;
    }
  }
}
