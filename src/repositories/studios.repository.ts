import { StudiosModel } from "../models/studios.model";
import { IStudiosInsertAll } from "../types/studios.types";

export class StudiosRepository {
  model: typeof StudiosModel;

  constructor() {
    this.model = StudiosModel;
  }

  async insertAll(studios: IStudiosInsertAll[]) {
    try {
      for (const studio of studios) {
        await this.model.query().insert(studio);
      }
    } catch (error) {
      throw error;
    }
  }
}
