export interface IStudio {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
}

export type IStudiosInsertAll = Pick<IStudio, "id" | "name">;
