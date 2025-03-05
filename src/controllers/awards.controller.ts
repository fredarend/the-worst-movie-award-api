import { NextFunction, Request, Response } from "express";
import { AwardsService } from "../services/awards.service";
import { controller, httpGet } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/di.types";
import { ApiResponse } from "../types/api.types";

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

      const response: ApiResponse<typeof awards> = {
        status: "sucess",
        data: awards,
        code: 200,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error processing award intervals request:", error);
      next(error);
    }
  }
}
