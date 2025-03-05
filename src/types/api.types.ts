export interface ApiResponse<T> {
  status: "sucess" | "error";
  data?: T;
  message?: string;
  code: number;
}
