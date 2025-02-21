export interface IAward {
  id: number;
  title: string;
  year: string;
  winner: boolean;
  updated_at: Date;
  created_at: Date;
}

export type IAwardsInsertAll = Omit<IAward, "created_at" | "updated_at">;

export type IAwardsWithProducer = Omit<
  IAward,
  "id" | "created_at" | "updated_at"
> & {
  producer_name: string;
};
