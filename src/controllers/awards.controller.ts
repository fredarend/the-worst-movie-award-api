import { NextFunction, Request, Response } from "express";
import { AwardsService } from "../services/awards.service";
import { controller, httpGet } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/di.types";

@controller("/api/producers")
export class AwardsController {
  constructor(
    @inject(TYPES.AwardsService)
    private readonly awardsService: AwardsService
  ) {}

  @httpGet("/awards/intervals")
  async getAwardsIntervals(req: Request, res: Response, next: NextFunction) {
    try {
      const awards = await this.awardsService.awardsIntervals();
      res.status(200).json(awards);
    } catch (error) {
      console.error("Error processing award intervals request:", error);
      next(error);
    }
  }
}
