import { IAwardsStudiosInsertAll } from "../../types";

export interface IAwardsStudiosRepository {
  insertAll(awardsStudios: IAwardsStudiosInsertAll[]): Promise<void>;
}
