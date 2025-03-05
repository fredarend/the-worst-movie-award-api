import "reflect-metadata"; // Isso precisa ser importado uma vez, geralmente no início da aplicação
import { Container } from "inversify";

import { TYPES } from "../types/di.types";

import { AwardsService } from "../services/awards.service";
import { AwardsController } from "../controllers/awards.controller";

import {
  ProducersRepository,
  AwardsRepository,
  StudiosRepository,
  AwardsProducersRepository,
  AwardsStudiosRepository,
} from "../repositories";

import {
  IProducersRepository,
  IAwardsRepository,
  IStudiosRepository,
  IAwardsProducersRepository,
  IAwardsStudiosRepository,
} from "../repositories/interfaces";
import ProcessCSV from "../data/processors/processCSV.processor";
import { IProcessCSV } from "../data/interfaces/processCSV.interface";

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

container
  .bind<IProducersRepository>(TYPES.ProducersRepository)
  .to(ProducersRepository)
  .inSingletonScope();

container
  .bind<IStudiosRepository>(TYPES.StudiosRepository)
  .to(StudiosRepository)
  .inSingletonScope();

container
  .bind<IAwardsProducersRepository>(TYPES.AwardsProducersRepository)
  .to(AwardsProducersRepository)
  .inSingletonScope();

container
  .bind<IAwardsStudiosRepository>(TYPES.AwardsStudiosRepository)
  .to(AwardsStudiosRepository)
  .inSingletonScope();

container.bind<IProcessCSV>(TYPES.ProcessCSV).to(ProcessCSV).inSingletonScope();

export { container };
