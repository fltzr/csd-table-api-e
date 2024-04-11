import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsBoolean,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import type { UUID } from 'crypto';
import {
  ALL_OPERATIONS,
  EXCLUDE_CREATE,
  EXCLUDE_READ,
  ONLY_READ,
  ONLY_UPDATE,
} from './dto-groups';

export interface DatabaseAttributes {
  id: string;
  uuid: UUID; // automatically generated at creation at db level
  accessLevel: number; // default is `4`
  accessClassification: string; // default is `U`
  expiresOn: Date; // default is 1 year from the time of _creation_
  updatedAt: Date; // default is the time the DTO conversion is made for UPDATE
  updatedBy: string;
  createdAt: Date; // default is the time the DTO conversion is made for CREATE
  createdBy: string;
}

export class BaseDTO {
  @ValidateIf((o) => !o.id, { groups: ONLY_UPDATE })
  @IsString({ groups: EXCLUDE_READ })
  @Expose({ groups: EXCLUDE_CREATE, toClassOnly: true })
  @IsUUID('4', { groups: EXCLUDE_CREATE })
  uuid: UUID;

  @Expose({ name: 'isRegistered', groups: ALL_OPERATIONS })
  @IsBoolean({ message: 'isRegistered must be a boolean' })
  is_registered?: boolean;

  @Expose({ name: 'isDeleted', groups: ONLY_READ })
  @IsBoolean()
  is_deleted?: boolean;

  @Expose({ name: 'updatedAt', groups: ONLY_UPDATE })
  @IsDateString()
  updated_at: Date;

  @Expose({ name: 'createdAt' })
  @IsDateString()
  created_at: Date;
}

/**
 import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf, IsDate } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

// Constants for operation groups
const CREATE = 'create';
const UPDATE = 'update';

export const ONLY_CREATE = [CREATE];
export const ONLY_UPDATE = [UPDATE];

class ResourceDTO {
    @ValidateIf(o => !o.uuid, { groups: ONLY_UPDATE }) // Validate id if uuid is not provided
    @IsUUID(4, { groups: ONLY_UPDATE })
    @IsOptional({ always: true }) // Make optional to allow uuid as an alternative
    @Expose({ groups: [CREATE, UPDATE] })
    id?: string;

    @ValidateIf(o => !o.id, { groups: ONLY_UPDATE }) // Validate uuid if id is not provided
    @IsUUID(4, { groups: ONLY_UPDATE })
    @IsOptional({ always: true }) // Make optional to allow id as an alternative
    @Expose({ groups: [CREATE, UPDATE] })
    uuid?: string;

    @IsString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] }) // Optional for update
    @Expose({ groups: [CREATE, UPDATE] })
    name?: string;

    @IsString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] }) // Optional for update
    @Expose({ groups: [CREATE, UPDATE] })
    description?: string;

    @IsDate({ groups: ONLY_UPDATE })
    @Type(() => Date) // Ensures the value is treated as a Date
    @Expose({ groups: [UPDATE] })
    updatedAt: Date;

    @IsString({ groups: ONLY_UPDATE })
    @Expose({ groups: [UPDATE] })
    updatedBy: string;

    @IsDate({ groups: ONLY_CREATE })
    @Type(() => Date) // Ensures the value is treated as a Date
    @Expose({ groups: [CREATE] })
    createdAt?: Date;

    @IsString({ groups: ONLY_CREATE })
    @Expose({ groups: [CREATE] })
    createdBy?: string;

    constructor(partial: Partial<ResourceDTO>) {
        Object.assign(this, partial);
    }
}

// Note: For the date fields, you may need to use @Transform decorator to handle the conversion if you're receiving the date as a string from the request.

 */
