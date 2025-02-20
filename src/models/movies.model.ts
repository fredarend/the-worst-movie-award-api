import { Model, RelationMappings, JSONSchema } from "objection";

import { ProducersModel, StudiosModel } from "./";
import { IMovie } from "../types";

export class MoviesModel extends Model implements IMovie {
  id: number;
  title: string;
  year: number;
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
      title: { type: "string", minLength: 1, maxLength: 255 },
      year: { type: "integer" },
      winner: { type: "boolean" },
      studio_id: { type: "integer" },
      producer_id: { type: "integer" },
      updated_at: { type: "date" },
      created_at: { type: "date" },
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
