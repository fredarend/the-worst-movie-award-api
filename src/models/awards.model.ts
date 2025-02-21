import { Model, RelationMappings, JSONSchema } from "objection";

import { ProducersModel } from "./producers.model";
import { StudiosModel } from "./studios.model";

import { IAward } from "../types/awards.types";

export class AwardsModel extends Model implements IAward {
  id: number;
  title: string;
  year: string;
  winner: boolean;
  updated_at: Date;
  created_at: Date;

  static tableName = "awards";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["title", "year", "winner"],
    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      year: { type: "string" },
      winner: { type: "boolean" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    studio: {
      relation: Model.BelongsToOneRelation,
      modelClass: StudiosModel,
      join: {
        from: "awards.studio_id",
        to: "studios.id",
      },
    },
    producer: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProducersModel,
      join: {
        from: "awards.producer_id",
        to: "producers.id",
      },
    },
  };
}
