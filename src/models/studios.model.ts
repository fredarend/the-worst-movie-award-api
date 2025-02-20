import { JSONSchema, Model, RelationMappings } from "objection";

import { MoviesModel } from "./";
import { IStudio } from "../types";

export class StudiosModel extends Model implements IStudio {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;

  static tableName = "studios";

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
        from: "studios.id",
        to: "movies.studio_id",
      },
    },
  };
}
