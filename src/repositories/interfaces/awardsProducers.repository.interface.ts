import { IAwardsProducersInsertAll } from "../../types";

export interface IAwardsProducersRepository {
  insertAll(awardsProducers: IAwardsProducersInsertAll[]): Promise<void>;
}
