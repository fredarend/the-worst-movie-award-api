import { Model, RelationMappings, JSONSchema } from "objection";

import { ProducersModel } from "./producers.model";
import { StudiosModel } from "./studios.model";

import { IMovie } from "../types/movies.types";

export class MoviesModel extends Model implements IMovie {
  id: number;
  title: string;
  year: string;
  winner: boolean;
  studio_id: number;
  producer_id: number;
  updated_at: Date;
  created_at: Date;

  static tableName = "movies";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["title", "year", "winner", "studio_id", "producer_id"],
    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      year: { type: "string" },
      winner: { type: "boolean" },
      studio_id: { type: "integer" },
      producer_id: { type: "integer" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    studio: {
      relation: Model.BelongsToOneRelation,
      modelClass: StudiosModel,
      join: {
        from: "movies.studio_id",
        to: "studios.id",
      },
    },
    producer: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProducersModel,
      join: {
        from: "movies.producer_id",
        to: "producers.id",
      },
    },
  };
}
