import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AwardsService } from "../services/awards.service";

export class AwardsController {
  private awardsService: AwardsService;
  constructor() {
    this.awardsService = new AwardsService();
  }

  async producersAwardsIntervals(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const awards = await this.awardsService.awardsIntervals();
      res.status(200).json(awards);
    } catch (error) {
      console.error("Error processing award intervals request:", error);
      next(error);
    }
  }
}
