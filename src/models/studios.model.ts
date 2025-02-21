import { JSONSchema, Model } from "objection";

import { IStudio } from "../types/studios.types";

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
      name: { type: "string" },
      updated_at: { type: "string", format: "date-time" },
      created_at: { type: "string", format: "date-time" },
    },
  };
}
