import { Model, JSONSchema } from "objection";

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
}
