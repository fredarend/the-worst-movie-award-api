import { ProducersModel } from "../models";
import { IProducer } from "../types";

export class ProducersRepository {
  model: ProducersModel;

  constructor() {
    this.model = new ProducersModel();
  }

  async insertAll(producers: Pick<IProducer, "name">[]) {
    await this.model.$query().insert(producers);
  }
}
