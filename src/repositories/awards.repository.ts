import { IAwardsInsertAll, IAwardsWithProducer } from "./../types/awards.types";
import { AwardsModel } from "../models/awards.model";

export class AwardsRepository {
  model: typeof AwardsModel;

  constructor() {
    this.model = AwardsModel;
  }

  async insertAll(awards: IAwardsInsertAll[]) {
    try {
      for (const award of awards) {
        await this.model.query().insert(award);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IAwardsWithProducer[]> {
    try {
      const response: IAwardsWithProducer[] = <any>(
        await this.model
          .query()
          .select(
            "awards.title",
            "awards.year",
            "awards.winner",
            "awards.producer_id",
            "producers.name as producer_name"
          )
          .join("producers", "awards.producer_id", "producers.id")
          .where("awards.winner", true)
          .groupBy("awards.producer_id", "producers.name")
          .havingRaw("COUNT(awards.producer_id) > 1")
          .orderBy("awards.year", "asc")
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
