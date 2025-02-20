import { MoviesModel } from "../models";

export class MoviesRepository {
  model: MoviesModel;

  constructor() {
    this.model = new MoviesModel();
  }
}
