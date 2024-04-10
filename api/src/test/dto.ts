import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { camelCase } from 'lodash-es';
import { AllOperations, BaseDTO, ExcludeRead, OnlyCreate } from './base-dto';

export interface ITestDTO {
  name?: string;
  amount?: number;
  is_valid_amount?: boolean;
}

export class TestDTO extends BaseDTO implements ITestDTO {
  @Expose({ name: 'name', groups: AllOperations })
  name?: string;

  @Expose({ name: 'amount', groups: OnlyCreate })
  @IsNumber()
  amount?: number;

  @Expose({ name: 'isValidAmount', groups: ExcludeRead })
  @IsBoolean()
  is_valid_amount?: boolean;
}
