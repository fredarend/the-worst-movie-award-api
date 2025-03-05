import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { ApiResponse } from "../types/api.types";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (createHttpError.isHttpError(err)) {
    console.error(`[ERROR ${err.status}] ${err.message}`);

    const response: ApiResponse<null> = {
      status: "error",
      message: err.message,
      code: err.status,
    };

    res.status(err.status).json(response);
    return;
  }

  console.error("[INTERNAL SERVER ERROR]", err);

  const response: ApiResponse<null> = {
    status: "error",
    message: err.message || "Internal server error.",
    code: 500,
  };

  res.status(500).json(response);
};
