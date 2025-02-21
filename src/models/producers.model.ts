import { JSONSchema, Model } from "objection";

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
}
