import fs from "fs";
import csvParser from "csv-parser";
import path from "path";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";

import {
  IAwardsInsertAll,
  IAwardsProducersInsertAll,
  IAwardsStudiosInsertAll,
  TYPES,
} from "../../types";
import { ICsvRow, IInsertData } from "../../types/processCSV.types";

import {
  IAwardsProducersRepository,
  IAwardsRepository,
  IAwardsStudiosRepository,
  IProducersRepository,
  IStudiosRepository,
} from "../../repositories/interfaces";
import { IProcessCSV } from "../interfaces/processCSV.interface";

@injectable()
class ProcessCSV implements IProcessCSV {
  constructor(
    @inject(TYPES.AwardsRepository)
    private readonly awardsRepository: IAwardsRepository,
    @inject(TYPES.ProducersRepository)
    private readonly producersRepository: IProducersRepository,
    @inject(TYPES.StudiosRepository)
    private readonly studiosRepository: IStudiosRepository,
    @inject(TYPES.AwardsProducersRepository)
    private readonly awardsProducersRepository: IAwardsProducersRepository,
    @inject(TYPES.AwardsStudiosRepository)
    private readonly awardsStudiosRepository: IAwardsStudiosRepository
  ) {}

  async run() {
    try {
      const response = await this.processCSV();
      console.log("CSV file processed successfully", {
        awards: response.awards.length,
        producers: response.producers.length,
        studios: response.studios.length,
      });

      await this.insertData(response);
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        throw error;
      }

      throw createHttpError(500, "Error processing CSV");
    }
  }

  private async processCSV() {
    const producersMap = new Map<string, number>();
    const studiosMap = new Map<string, number>();
    const awards: IAwardsInsertAll[] = [];
    const awardsProducers: IAwardsProducersInsertAll[] = [];
    const awardsStudios: IAwardsStudiosInsertAll[] = [];

    const csvFilePath = path.join(__dirname, "../movieList.csv");

    if (!fs.existsSync(csvFilePath)) {
      throw createHttpError(404, "CSV file not found");
    }

    await new Promise<void>((resolve, reject) => {
      console.log("Processing CSV file", { path: csvFilePath });

      fs.createReadStream(csvFilePath)
        .pipe(csvParser({ separator: ";" }))
        .on("data", (row: ICsvRow) => {
          try {
            const { year, title, winner, producers, studios } = row;

            if (!year || !title || !producers || !studios) {
              console.warn("Linha do CSV com dados inválidos ignorada", {
                row,
              });
              return;
            }

            const awardId = awards.length + 1;

            awards.push({
              id: awardId,
              title,
              year,
              winner: winner === "yes",
            });

            const producersList = producers.replace(/ and /g, ", ").split(",");

            producersList.forEach((producer) => {
              const producerName = producer.trim();

              if (!producerName) return;

              if (!producersMap.has(producerName)) {
                producersMap.set(producerName, producersMap.size + 1);
              }

              const producerId = producersMap.get(producerName);

              awardsProducers.push({
                award_id: awardId,
                producer_id: producerId as number,
              });
            });

            const studiosList = studios.replace(/ and /g, ", ").split(",");

            studiosList.forEach((studio) => {
              const studioName = studio.trim();

              if (!studioName) return;

              if (!studiosMap.has(studioName)) {
                studiosMap.set(studioName, studiosMap.size + 1);
              }

              const studioId = studiosMap.get(studioName);

              awardsStudios.push({
                award_id: awardId,
                studio_id: studioId as number,
              });
            });
          } catch (rowError) {
            console.warn("Erro ao processar linha do CSV", {
              row,
              error: (rowError as Error).message,
            });
          }
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          console.error("Error reading CSV file", error);
          reject(createHttpError(500, "Error reading CSV file"));
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

    return { awards, producers, studios, awardsProducers, awardsStudios };
  }

  private async insertData({
    awards,
    producers,
    studios,
    awardsProducers,
    awardsStudios,
  }: IInsertData) {
    try {
      await Promise.all([
        this.studiosRepository.insertAll(studios),
        this.producersRepository.insertAll(producers),
      ]);
      console.log("Producers and studios inserted successfully");

      await this.awardsRepository.insertAll(awards);
      console.log("Awards inserted successfully");

      await Promise.all([
        this.awardsProducersRepository.insertAll(awardsProducers),
        this.awardsStudiosRepository.insertAll(awardsStudios),
      ]);
      console.log(
        "Join tables awards_producers and awards_studios inserted successfully"
      );
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        throw error;
      }

      console.error("Error inserting data into the database:", error);
      throw createHttpError(500, "Error inserting data into the database");
    }
  }
}

export default ProcessCSV;
