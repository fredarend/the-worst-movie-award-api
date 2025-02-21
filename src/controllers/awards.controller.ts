import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";

import { AwardsService } from "../services/awards.service";

export class AwardsController {
  private awardsService: AwardsService;
  constructor() {
    this.awardsService = new AwardsService();
  }

  async producersAwardsIntervals(
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const awards = await this.awardsService.awardsIntervals();
      res.status(200).json(awards);
    } catch (error) {
      next(error);
    }
  }
}
