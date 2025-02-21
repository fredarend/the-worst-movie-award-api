import { Router } from "express";
import { AwardsController } from "../controllers/awards.controller";

const router = Router();

const awardsController = new AwardsController();

router.get("/producers/awards/intervals", (req, res, next) =>
  awardsController.producersAwardsIntervals(req, res, next)
);

export default router;
