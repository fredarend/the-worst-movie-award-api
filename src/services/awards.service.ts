import { AwardsRepository } from "../repositories/awards.repository";
import { IProducersWithMultAwards } from "../types/awards.types";
import { IProducerAwardDetails } from "../types/producers.types";

export class AwardsService {
  private awardsRepository: AwardsRepository;
  constructor() {
    this.awardsRepository = new AwardsRepository();
  }

  async awardsIntervals() {
    try {
      const awards = await this.awardsRepository.getProducersWithMultipleWins();

      const { min, max } = this.intervals(awards);

      return {
        min,
        max,
      };
    } catch (error) {
      throw error;
    }
  }

  private intervals(awards: IProducersWithMultAwards[]) {
    try {
      const intervals = new Map<number, IProducerAwardDetails[]>();

      let i = 0;
      let j = 1;

      while (i < awards.length) {
        if (awards[i].producer_id === awards[j].producer_id) {
          const previousWin = Number(awards[i].year),
            followingWin = Number(awards[j].year);
          const interval = followingWin - previousWin;

          const awardDetail: IProducerAwardDetails = {
            producer: awards[i].producer_name,
            interval: interval,
            previousWin: previousWin,
            followingWin: followingWin,
          };

          if (intervals.has(interval)) {
            intervals.get(interval)?.push(awardDetail);
          } else {
            intervals.set(interval, [awardDetail]);
          }

          i++;
          j = i;
        }

        if (j === awards.length - 1) {
          i++;
          j = i + 1 || i;
        } else {
          j++;
        }
      }

      let min: IProducerAwardDetails[] = [];
      let max: IProducerAwardDetails[] = [];

      for (const i of intervals) {
        if (!min.length && !max.length) {
          min.push(...i[1]);
          max.push(...i[1]);
        }

        if (min[0].interval > i[0]) {
          min = [];
          min.push(...i[1]);
        }

        if (max[0].interval < i[0]) {
          max = [];
          max.push(...i[1]);
        }
      }

      return {
        min,
        max,
      };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}
