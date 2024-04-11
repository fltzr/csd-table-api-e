import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import {
  type ValidatorOptions,
  ValidationError,
  validate,
} from 'class-validator';
import { logger } from '../utils/winston-logger';

const rawObject = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 123,
  isRegistered: true,
  isDeleted: false,
  isValidAmount: true,
  updatedAt: new Date(),
};

export const validateDto =
  <T extends object>(dtoClass: new () => T, groups: string[] = []) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const validationOptions: ValidatorOptions = {
      groups,
      // strictGroups: true,
      skipMissingProperties: true,
      forbidUnknownValues: false,
      // skipNullProperties: true,
      // skipUndefinedProperties: true,
      validationError: {
        target: false,
        value: false,
      },
    };

    const dtoObject = plainToInstance(dtoClass, rawObject, {
      excludeExtraneousValues: true,
      groups,
    });

    const errors = await validate(dtoObject, validationOptions);

    logger.info(`errors: ${JSON.stringify(errors, null, 2)}`);

    if (errors.length > 0) {
      const validationErrors: Record<string, string[]> = {};

      errors.forEach((error: ValidationError) => {
        if (error.constraints) {
          validationErrors[error.property] = Object.values(error.constraints);
        }
      });

      return response.status(400).json({ errors: validationErrors });
    }

    request.body = dtoObject;
    next();
  };
