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
      const intervals = new Map<number, IProducerAwardDetails>();

      for (const award of awards) {
        if (!intervals.has(award.producer_id)) {
          intervals.set(award.producer_id, {
            producer: award.producer_name,
            previousWin: award.year,
            followingWin: null,
            interval: null,
          });
        } else {
          const producer = intervals.get(award.producer_id);

          if (producer) {
            if (producer.followingWin !== null) {
              producer.previousWin = producer.followingWin;
            }

            const interval = Number(award.year) - Number(producer?.previousWin);

            producer.interval = interval;
            producer.followingWin = award.year;
          }
        }
      }

      const intervalsArray = Array.from(intervals.values());

      const minInterval = Math.min(
        ...intervalsArray.map((i) => i.interval as number)
      );
      const maxInterval = Math.max(
        ...intervalsArray.map((i) => i.interval as number)
      );

      const min: IProducerAwardDetails[] = [];
      const max: IProducerAwardDetails[] = [];

      intervalsArray.forEach((i) => {
        if (i.interval === minInterval) {
          min.push(i);
        } else if (i.interval === maxInterval) {
          max.push(i);
        }
      });

      return {
        min,
        max,
      };
    } catch (error) {
      throw error;
    }
  }
}
