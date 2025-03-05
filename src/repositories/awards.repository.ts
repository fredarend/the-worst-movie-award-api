import createHttpError from "http-errors";
import { injectable } from "inversify";
import {
  IAwardsInsertAll,
  IProducersWithMultAwards,
} from "./../types/awards.types";
import { AwardsModel } from "../models/awards.model";
import { IAwardsRepository } from "./interfaces/awards.repository.interface";

@injectable()
export class AwardsRepository implements IAwardsRepository {
  private readonly model: typeof AwardsModel;

  constructor() {
    this.model = AwardsModel;
  }

  async insertAll(awards: IAwardsInsertAll[]): Promise<void> {
    try {
      for (const award of awards) {
        await this.model.query().insert(award);
      }
    } catch (error) {
      console.error("Error inserting awards into the database:", error);
      throw createHttpError(500, "Error inserting awards into the database");
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

      const response = await this.model
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
        .orderBy("awards.year", "asc");

      if (!response.length) {
        throw createHttpError(404, "No producers with multiple awards found");
      }

      return response as unknown as IProducersWithMultAwards[];
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        throw error;
      }

      console.error("Error fetching producers with multiple awards:", error);
      throw createHttpError(
        500,
        "Error fetching producers with multiple awards."
      );
    }
  }
}
