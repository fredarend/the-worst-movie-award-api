import {
  IAwardsInsertAll,
  IProducersWithMultAwards,
} from "./../types/awards.types";
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

  async getProducersWithMultipleWins(): Promise<IProducersWithMultAwards[]> {
    try {
      const winMoreTimes = this.model
        .query()
        .select("awards_producers.producer_id")
        .join("awards_producers", "awards.id", "awards_producers.award_id")
        .where("awards.winner", true)
        .groupBy("awards_producers.producer_id")
        .havingRaw("COUNT(awards_producers.producer_id) > 1");

      const response: IProducersWithMultAwards[] = <any>(
        await this.model
          .query()
          .select(
            "awards.title",
            "awards.year",
            "awards.winner",
            "awards_producers.producer_id",
            "producers.name as producer_name"
          )
          .join("awards_producers", "awards.id", "awards_producers.award_id")
          .join("producers", "awards_producers.producer_id", "producers.id")
          .where("winner", true)
          .whereIn("awards_producers.producer_id", winMoreTimes)
          .orderBy("awards.year", "asc")
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
