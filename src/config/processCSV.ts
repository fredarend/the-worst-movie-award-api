import fs from "fs";
import csvParser from "csv-parser";

import {
  ProducersRepository,
  MoviesRepository,
  StudiosRepository,
} from "../repositories";

import { IProducersInsertAll } from "../types/producers.types";
import { IStudiosInsertAll } from "../types/studios.types";
import { IMoviesInsertAll } from "../types/movies.types";

interface ICsvRow {
  title: string;
  year: string;
  studios: string;
  producers: string;
  winner: "yes" | null;
}

class ProcessCSV {
  private readonly studiosRepository: StudiosRepository;
  private readonly producersRepository: ProducersRepository;
  private readonly moviesRepository: MoviesRepository;

  constructor() {
    this.studiosRepository = new StudiosRepository();
    this.producersRepository = new ProducersRepository();
    this.moviesRepository = new MoviesRepository();
  }

  async run() {
    try {
      const response = await this.processCSV();

      if (response?.movies && response?.producers && response?.studios) {
        const { movies, producers, studios } = response;

        await this.insertData({ producers, studios, movies });

        console.log("Data successfully inserted into database");
        return;
      }

      console.log("No data to insert into database");
    } catch (error) {
      throw error;
    }
  }

  private async processCSV() {
    try {
      const producersMap = new Map<string, number>();
      const studiosMap = new Map<string, number>();
      const movies: IMoviesInsertAll[] = [];

      await new Promise<void>((resolve, reject) => {
        console.log("Processing CSV file...");

        fs.createReadStream(`${__dirname}/../data/movieList.csv`)
          .pipe(csvParser({ separator: ";" }))
          .on("data", (row: ICsvRow) => {
            const { year, title, winner, producers, studios } = row;

            if (!producersMap.has(producers)) {
              producersMap.set(producers, producersMap.size + 1);
            }

            if (!studiosMap.has(studios)) {
              studiosMap.set(studios, studiosMap.size + 1);
            }

            movies.push({
              title,
              year,
              winner: winner === "yes",
              producer_id: producersMap.size,
              studio_id: studiosMap.size,
            });
          })
          .on("end", () => {
            console.log("CSV file successfully processed");
            resolve();
          })
          .on("error", (error) => {
            reject(error);
          });
      });

      const producers = Array.from(producersMap, ([name, id]) => ({
        name,
        id,
      }));

      const studios = Array.from(studiosMap, ([name, id]) => ({
        name,
        id,
      }));

      return { movies, producers, studios };
    } catch (error) {
      console.log("Error loading CSV files: ", error);
      throw error;
    }
  }

  private async insertData({
    movies,
    producers,
    studios,
  }: {
    movies: IMoviesInsertAll[];
    studios: IStudiosInsertAll[];
    producers: IProducersInsertAll[];
  }) {
    try {
      await Promise.all([
        this.producersRepository.insertAll(producers),
        this.studiosRepository.insertAll(studios),
      ]);
      console.log("Producers and Studios inserted");

      await this.moviesRepository.insertAll(movies);
      console.log("Movies inserted");
    } catch (error) {
      throw error;
    }
  }
}

export default new ProcessCSV();
