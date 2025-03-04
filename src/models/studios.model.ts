import { JSONSchema, Model, RelationMappings } from "objection";
import { AwardsModel } from "./awards.model";
import { IStudio } from "../types/studios.types";

export class StudiosModel extends Model implements IStudio {
  id!: number;
  name!: string;
  updated_at!: Date;
  created_at!: Date;

  static tableName = "studios";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["name"],
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    awards: {
      relation: Model.ManyToManyRelation,
      modelClass: AwardsModel,
      join: {
        from: "studios.id",
        through: {
          from: "awards_studios.studio_id",
          to: "awards_studios.award_id",
        },
        to: "awards.id",
      },
    },
  };
}
