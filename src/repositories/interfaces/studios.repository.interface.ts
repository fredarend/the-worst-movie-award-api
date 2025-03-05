import { IStudiosInsertAll } from "../../types";

export interface IStudiosRepository {
  insertAll(studios: IStudiosInsertAll[]): Promise<void>;
}
