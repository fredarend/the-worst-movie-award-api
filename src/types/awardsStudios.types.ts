export interface IAwardsStudios {
  id: number;
  award_id: number;
  studio_id: number;
  updated_at: Date;
  created_at: Date;
}

export type IAwardsStudiosInsertAll = Pick<
  IAwardsStudios,
  "award_id" | "studio_id"
>;
