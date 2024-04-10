import { Request, Response, Router } from 'express';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance, instanceToPlain } from 'class-transformer';

import { logger } from '../core/utils/winston-logger';

import { TestDTO } from './dto';
import { validateDto } from '../core/middleware/validate-dto.middleware';

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: true,
  validationError: {
    target: false,
    value: false,
  },
};

const rawObject = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 123,
  isRegistered: 'Hehe',
  isDeleted: false,
  isValidAmount: true,
  updatedAt: new Date(),
};

export const exampleRouter = Router();

// JSON => DTO
exampleRouter
  .get('/example', async (req: Request, res: Response) => {
    logger.info(`Request body: ${JSON.stringify(rawObject, null, 2)}`);

    const jsonToDto = plainToInstance(TestDTO, rawObject, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    logger.info(`UpdateTestDTO: ${JSON.stringify(jsonToDto, null, 2)}`);

    try {
      const validation = await validate(jsonToDto, validatorOptions);

      if (validation.length > 0) {
        validation.map((i) => {});
      }

      logger.info(`validate: ${JSON.stringify(validation, null, 2)}`);

      logger.info('Validation success');
    } catch (error) {
      logger.error(`Validation error: ${error}`);
    }

    logger.info('--------------------------------------------');

    const dtoToPlain = instanceToPlain(jsonToDto);

    logger.info(
      `UpdateTestDTO to plain: ${JSON.stringify(dtoToPlain, null, 2)}`,
    );

    res.json({ message: 'Hello, World!' });
  })
  // DTO => JSON
  .get('/example-1', async (req: Request, res: Response) => {
    const dtoInstance = plainToInstance(TestDTO, rawObject, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    logger.info(`UpdateTestDTO: ${JSON.stringify(dtoInstance, null, 2)}`);

    const dtoToJson = instanceToPlain(dtoInstance, {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
    });

    logger.info(
      `UpdateTestDTO to plain: ${JSON.stringify(dtoToJson, null, 2)}`,
    );

    res.json({ message: 'Hello, World.. again!' });
  })

  .get(
    '/read-operation',
    validateDto(TestDTO),
    async (request: Request, response: Response) => {
      logger.info(`request.body: ${JSON.stringify(request.body)}`);

      return response.status(200).json('Hello!');
    },
  )

  .get('/write-operation', async (request: Request, response: Response) => {})

  .get('/update-operation', async (request: Request, response: Response) => {});
