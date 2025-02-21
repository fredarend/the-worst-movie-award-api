import fs from "fs";
import csvParser from "csv-parser";

import {
  ProducersRepository,
  AwardsRepository,
  StudiosRepository,
  AwardsProducersRepository,
  AwardsStudiosRepository,
} from "../repositories";

import {
  IAwardsInsertAll,
  IAwardsProducersInsertAll,
  IAwardsStudiosInsertAll,
  IProducersInsertAll,
  IStudiosInsertAll,
} from "../types";

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
  private readonly awardsRepository: AwardsRepository;
  private readonly awardsProducersRepository: AwardsProducersRepository;
  private readonly awardsStudiosRepository: AwardsStudiosRepository;

  constructor() {
    this.studiosRepository = new StudiosRepository();
    this.producersRepository = new ProducersRepository();
    this.awardsRepository = new AwardsRepository();
    this.awardsProducersRepository = new AwardsProducersRepository();
    this.awardsStudiosRepository = new AwardsStudiosRepository();
  }

  async run() {
    try {
      const response = await this.processCSV();

      await this.insertData(response);
    } catch (error) {
      throw error;
    }
  }

  private async processCSV() {
    try {
      const producersMap = new Map<string, number>();
      const studiosMap = new Map<string, number>();
      const awards: IAwardsInsertAll[] = [];
      const awardsProducers: IAwardsProducersInsertAll[] = [];
      const awardsStudios: IAwardsStudiosInsertAll[] = [];

      await new Promise<void>((resolve, reject) => {
        console.log("Processing CSV file...");

        fs.createReadStream(`${__dirname}/../data/movieList.csv`)
          .pipe(csvParser({ separator: ";" }))
          .on("data", (row: ICsvRow) => {
            const { year, title, winner, producers, studios } = row;

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

      return { awards, producers, studios, awardsProducers, awardsStudios };
    } catch (error) {
      console.log("Error loading CSV files: ", error);
      throw error;
    }
  }

  private async insertData({
    awards,
    producers,
    studios,
    awardsProducers,
    awardsStudios,
  }: {
    awards: IAwardsInsertAll[];
    studios: IStudiosInsertAll[];
    producers: IProducersInsertAll[];
    awardsProducers: IAwardsProducersInsertAll[];
    awardsStudios: IAwardsStudiosInsertAll[];
  }) {
    try {
      await Promise.all([
        this.studiosRepository.insertAll(studios),
        this.producersRepository.insertAll(producers),
      ]);
      console.log("Producers and Studios inserted");

      await this.awardsRepository.insertAll(awards);
      console.log("Awards inserted");

      await Promise.all([
        this.awardsProducersRepository.insertAll(awardsProducers),
        this.awardsStudiosRepository.insertAll(awardsStudios),
      ]);
      console.log(
        "Trhough tables awards_producers and awards_studios inserted"
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new ProcessCSV();
