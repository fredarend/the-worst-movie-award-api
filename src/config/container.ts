import "reflect-metadata"; // Isso precisa ser importado uma vez, geralmente no início da aplicação
import { Container } from "inversify";
import { TYPES } from "../types/di.types";
import { IAwardsRepository } from "../repositories/interfaces/awards.repository.interface";
import { AwardsRepository } from "../repositories/awards.repository";
import { AwardsService } from "../services/awards.service";
import { AwardsController } from "../controllers/awards.controller";

const container = new Container();

container
  .bind<IAwardsRepository>(TYPES.AwardsRepository)
  .to(AwardsRepository)
  .inSingletonScope();

container
  .bind<AwardsService>(TYPES.AwardsService)
  .to(AwardsService)
  .inSingletonScope();

container
  .bind<AwardsController>(TYPES.AwardsController)
  .to(AwardsController)
  .inSingletonScope();

export { container };
