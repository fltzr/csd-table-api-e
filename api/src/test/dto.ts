import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { BaseDTO } from './base-dto';

export interface TestDTO {
  name?: string;
  amount?: number;
  is_valid_amount?: boolean;
}

export class UpdateTestDTO extends BaseDTO implements TestDTO {
  @Expose()
  @IsString()
  name?: string;

  @Expose()
  @IsNumber()
  amount?: number;
  
  @Expose({ name: 'isValidAmount' })
  @IsBoolean()
  is_valid_amount?: boolean;
}