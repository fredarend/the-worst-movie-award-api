import { IProducersInsertAll } from "../../types";

export interface IProducersRepository {
  insertAll(producers: IProducersInsertAll[]): Promise<void>;
}
