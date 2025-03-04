import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (createHttpError.isHttpError(err)) {
    console.error(`[ERROR ${err.status}] ${err.message}`);

    res.status(err.status).json({
      status: "error",
      message: err.message,
      code: err.status,
    });
    return;
  }

  console.error("[INTERNAL SERVER ERROR]", err);

  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
    stack: err.stack,
  });
};
