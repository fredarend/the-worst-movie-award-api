import { Model, JSONSchema, RelationMappings } from "objection";
import { AwardsModel } from "./awards.model";
import { ProducersModel } from "./producers.model";
import { IAwardsProducers } from "../types";

export class AwardsProducersModel extends Model implements IAwardsProducers {
  id!: number;
  award_id!: number;
  producer_id!: number;
  updated_at!: Date;
  created_at!: Date;

  static tableName = "awards_producers";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["award_id", "producer_id"],
    properties: {
      id: { type: "integer" },
      award_id: { type: "integer" },
      producer_id: { type: "integer" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    award: {
      relation: Model.BelongsToOneRelation,
      modelClass: AwardsModel,
      join: {
        from: "awards_producers.award_id",
        to: "awards.id",
      },
    },
    producer: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProducersModel,
      join: {
        from: "awards_producers.producer_id",
        to: "producers.id",
      },
    },
  };
}
