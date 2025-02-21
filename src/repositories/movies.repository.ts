import { IMoviesInsertAll } from "./../types/movies.types";
import { MoviesModel } from "../models/movies.model";

export class MoviesRepository {
  model: typeof MoviesModel;

  constructor() {
    this.model = MoviesModel;
  }

  async insertAll(movies: IMoviesInsertAll[]) {
    try {
      for (const movie of movies) {
        await this.model.query().insert(movie);
      }
    } catch (error) {
      throw error;
    }
  }
}
