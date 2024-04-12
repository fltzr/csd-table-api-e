import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsBoolean, IsPositive } from 'class-validator';
import { BaseDTO } from './base-dto';
import { logger } from '../core/utils/winston-logger';

export class TestDTO extends BaseDTO {
  @Expose({ name: 'name' })
  @IsString()
  @Transform(({ value }) => value, { toClassOnly: true })
  name: string;

  @Expose({ name: 'amount' })
  @IsNumber()
  @Transform(({ value }) => value, { toClassOnly: true })
  amount?: number;

  @Expose({ name: 'isDeleted' })
  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === true, {
    toClassOnly: true,
  })
  is_deleted?: boolean;

  @Expose({ name: 'isValidAmount' })
  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === true, {
    toClassOnly: true,
  })
  is_valid_amount?: boolean;

  @Expose({ name: 'totalPrice' })
  @Transform(
    ({ value }) => {
      logger.info(`@Transform('totalPrice'): ${value}, ${typeof value}`);
      return value;
    },
    { toClassOnly: true },
  )
  @IsNumber()
  @IsPositive()
  total_price?: number;
}

export class TransactionDto {
  @Expose()
  @IsString()
  id: string;

  @Expose({ name: 'totalAmount' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @IsNumber()
  total_amount: number;

  @Expose()
  @IsString()
  name: string;

  @Expose({ name: 'isDeleted' })
  @Transform(({ value }) => (value ? true : false))
  @IsBoolean()
  is_deleted: boolean;

  @Expose({ name: 'isRegistered' })
  @Transform(({ value }) => (value ? true : false))
  @IsBoolean()
  is_registered: boolean;

  @Expose({ name: 'isValidAmount' })
  @Transform(({ value }) => (value ? true : false), { toClassOnly: true })
  @IsBoolean()
  is_valid_amount: boolean;
}
