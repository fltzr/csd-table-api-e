import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { logger } from '../utils/winston-logger';
import { HttpException } from '../exceptions/http-exception';

const d = new Date();

const clientCreateProductObject = {
  // modelNumber: '55EEOQW',
  description: 'Product description',
  manufacturerId: 55,
  catalogCategoryId: 21,
  productTypeId: 91,
  listPrice: 5775,
  endOfLifeDeadline: d.toISOString().split('T')[0],
  createdBy: 'JOSH',
};

const clientUpdateProductObject = {
  productId: 45,
  listPrice: 211.11,
  updatedBy: 'JOSH',
};

export const validateWithZod =
  (schema: z.ZodSchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    if (request.path === '/products/create') {
      const validationCreateResponse = schema.safeParse(
        clientCreateProductObject,
      );

      if (validationCreateResponse.success === false) {
        const errors = validationCreateResponse.error.issues;

        logger.info(`validationCreateError ${JSON.stringify(errors, null, 2)}`);

        return new HttpException(400, 'Validation error', errors);
      }

      request.body = validationCreateResponse.data;

      return next();
    }

    const validationUpdateResponse = schema.safeParse(
      clientUpdateProductObject,
    );

    if (validationUpdateResponse.success === false) {
      const errors = validationUpdateResponse.error.format();

      logger.info(
        `validationUpdateError: ${JSON.stringify(errors._errors, null, 2)}`,
      );

      return new HttpException(400, 'Validation error', errors._errors);
    }
    request.body = validationUpdateResponse.data;

    return next();
  };
