import {
  IAwardsInsertAll,
  IAwardsProducersInsertAll,
  IAwardsStudiosInsertAll,
  IProducersInsertAll,
  IStudiosInsertAll,
} from "./";

export type ICsvRow = {
  title: string;
  year: string;
  studios: string;
  producers: string;
  winner: "yes" | null;
};

export type IInsertData = {
  awards: IAwardsInsertAll[];
  studios: IStudiosInsertAll[];
  producers: IProducersInsertAll[];
  awardsProducers: IAwardsProducersInsertAll[];
  awardsStudios: IAwardsStudiosInsertAll[];
};
