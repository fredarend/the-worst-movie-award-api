import { JSONSchema, Model, RelationMappings } from "objection";

import { MoviesModel } from "./";
import { IProducer } from "../types";

export class ProducersModel extends Model implements IProducer {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;

  static tableName = "producers";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["name"],
    properties: {
      id: { type: "integer" },
      name: { type: "string", minLength: 1, maxLength: 255 },
      updated_at: { type: "date" },
      created_at: { type: "date" },
    },
  };

  static relationMappings: RelationMappings = {
    movies: {
      relation: Model.HasManyRelation,
      modelClass: MoviesModel,
      join: {
        from: "producers.id",
        to: "movies.producer_id",
      },
    },
  };
}
