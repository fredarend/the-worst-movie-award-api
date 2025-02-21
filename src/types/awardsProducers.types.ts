export interface IAwardsProducers {
  id: number;
  award_id: number;
  producer_id: number;
  updated_at: Date;
  created_at: Date;
}

export type IAwardsProducersInsertAll = Pick<
  IAwardsProducers,
  "award_id" | "producer_id"
>;
