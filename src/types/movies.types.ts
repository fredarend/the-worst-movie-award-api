export interface IMovie {
  id: number;
  title: string;
  year: string;
  winner: boolean;
  studio_id: number;
  producer_id: number;
  updated_at: Date;
  created_at: Date;
}

export type IMoviesInsertAll = Omit<IMovie, "id" | "created_at" | "updated_at">;
