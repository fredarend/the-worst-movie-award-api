import { Model, JSONSchema } from "objection";

import { IAwardsStudios } from "../types";

export class AwardsStudiosModel extends Model implements IAwardsStudios {
  id!: number;
  award_id!: number;
  studio_id!: number;
  updated_at!: Date;
  created_at!: Date;

  static tableName = "awards_studios";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["award_id", "studio_id"],
    properties: {
      id: { type: "integer" },
      award_id: { type: "integer" },
      studio_id: { type: "integer" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };
}
