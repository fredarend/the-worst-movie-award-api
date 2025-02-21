import { Request, Response } from "express";
import { AwardsService } from "../services/awards.service";

export class AwardsController {
  private awardsService: AwardsService;
  constructor() {
    this.awardsService = new AwardsService();
  }

  async producersAwardsIntervals(req: Request, res: Response) {
    try {
      const awards = await this.awardsService.awardsIntervals();
      res.status(200).json(awards);
    } catch (error) {
      console.log("teste 123", error);
      res.status(500).json({ error: error.message });
    }
  }
}
