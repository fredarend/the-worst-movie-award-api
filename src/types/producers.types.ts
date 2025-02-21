export interface IProducer {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
}

export type IProducersInsertAll = Pick<IProducer, "id" | "name">;

export type IProducerAwardDetails = {
  producer: string;
  previousWin: string;
  followingWin: string | null;
  interval: number | null;
};
