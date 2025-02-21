import { AwardsRepository } from "../repositories/awards.repository";
import { IAwardsWithProducer } from "../types/awards.types";

export class AwardsService {
  private awardsRepository: AwardsRepository;
  constructor() {
    this.awardsRepository = new AwardsRepository();
  }

  async awardsIntervals() {
    const awards = await this.awardsRepository.getAll();

    const min = this.getMinInterval(awards);

    return {
      awards,
    };
  }

  private getMinInterval(awards: IAwardsWithProducer[]) {
    const intervals = new Map<number, number>();
  }
}
