import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { plainToInstance, instanceToPlain } from 'class-transformer'

import { logger } from "../core/utils/winston-logger";

import { TestDTO, UpdateTestDTO } from "./dto";
import { is } from "drizzle-orm";

export const exampleRouter = Router();

exampleRouter.get('/example', async (req: Request, res: Response) => {
  const rawObject = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 123,
    isRegistered: false,
    isDeleted: false,
    updatedAt: new Date(),
  };

  logger.info(`Request body: ${JSON.stringify(rawObject, null, 2)}`)

  const updateObjectDto = plainToInstance(UpdateTestDTO, rawObject, { excludeExtraneousValues: true });

  logger.info(`UpdateTestDTO: ${JSON.stringify(updateObjectDto, null, 2)}`);

  const validation = await validate(updateObjectDto, { enableDebugMessages: true, skipMissingProperties: true, validationError: { target: false } });

  logger.info(`Validation: ${JSON.stringify(validation, null, 2)}`);

  logger.info('--------------------------------------------');

  const dtoToPlain = instanceToPlain(updateObjectDto);

  logger.info(`UpdateTestDTO to plain: ${JSON.stringify(dtoToPlain, null, 2)}`);

  res.json({ message: 'Hello, World!' });
});