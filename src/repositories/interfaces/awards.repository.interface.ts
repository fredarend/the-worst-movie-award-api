import {
  IAwardsInsertAll,
  IProducersWithMultAwards,
} from "../../types/awards.types";

export interface IAwardsRepository {
  insertAll(awards: IAwardsInsertAll[]): Promise<void>;
  getProducersWithMultipleWins(): Promise<IProducersWithMultAwards[]>;
}
