import { JSONSchema, Model, RelationMappings } from "objection";
import { AwardsModel } from "./awards.model";
import { IProducer } from "../types/producers.types";

export class ProducersModel extends Model implements IProducer {
  id!: number;
  name!: string;
  updated_at!: Date;
  created_at!: Date;

  static tableName = "producers";

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
        from: "producers.id",
        through: {
          from: "awards_producers.producer_id",
          to: "awards_producers.award_id",
        },
        to: "awards.id",
      },
    },
  };
}
