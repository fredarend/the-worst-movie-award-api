import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
