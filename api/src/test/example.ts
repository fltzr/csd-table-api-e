import { Request, Response, Router } from "express";
import { validate, validateOrReject, ValidatorOptions } from "class-validator";
import { plainToInstance, instanceToPlain } from 'class-transformer'

import { logger } from "../core/utils/winston-logger";

import { UpdateTestDTO } from "./dto";

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: true,
  validationError: {
    target: false,
    value: false
  },
}

const rawObject = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 123,
  isRegistered: 'Hehe',
  isDeleted: false,
  updatedAt: new Date(),
};

export const exampleRouter = Router();

exampleRouter.get('/example', async (req: Request, res: Response) => {
  logger.info(`Request body: ${JSON.stringify(rawObject, null, 2)}`)

  const updateObjectDto = plainToInstance(UpdateTestDTO, rawObject, { excludeExtraneousValues: true, exposeUnsetFields: false });

  logger.info(`UpdateTestDTO: ${JSON.stringify(updateObjectDto, null, 2)}`);

  try {
    const validation = await validate(updateObjectDto, validatorOptions);

    if (validation.length > 0) {
      validation.map(i => {
        
      })
    }
    
    logger.info(`validate: ${JSON.stringify(validation, null, 2)}`);

    logger.info('Validation success');
  } catch (error) {
    logger.error(`Validation error: ${error}`);
  }


  logger.info('--------------------------------------------');

  const dtoToPlain = instanceToPlain(updateObjectDto);

  logger.info(`UpdateTestDTO to plain: ${JSON.stringify(dtoToPlain, null, 2)}`);

  res.json({ message: 'Hello, World!' });
})
.get('/example-1', async (req: Request, res: Response) => {
  const updateObjectDTO = plainToInstance(UpdateTestDTO, rawObject)

})