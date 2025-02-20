export interface IMovie {
  id: number;
  title: string;
  year: number;
  winner: boolean;
  studio_id: number;
  producer_id: number;
  updated_at: Date;
  created_at: Date;
}
