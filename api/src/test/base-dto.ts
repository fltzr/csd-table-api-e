import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID, IsString, IsBoolean, IsDate } from 'class-validator';

export interface BaseDTO {
  id: string;
  is_registered?: boolean;
  is_deleted?: boolean;
  updated_at: Date;
}

export class BaseDTO implements BaseDTO {
  @Expose()
  @IsUUID('4')
  id: string;

  @Expose({ name: 'isRegistered' })
  @IsBoolean({ message: 'isRegistered must be a boolean' })
  is_registered?: boolean;

  @Expose({ name: 'isDeleted' })
  @IsBoolean()
  is_deleted?: boolean;

  @Expose({ name: 'updatedAt' })
  @IsDate()
  updated_at: Date;
}