import { StudiosModel } from "../models";
import { IStudio } from "../types";

export class StudiosRepository {
  model: StudiosModel;

  constructor() {
    this.model = new StudiosModel();
  }

  async insertAll(studios: Pick<IStudio, "name">[]) {
    await this.model.$query().insert(studios);
  }
}
