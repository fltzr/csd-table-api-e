import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsUUID, IsBoolean, IsDateString } from 'class-validator';
import type { UUID } from 'crypto';

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
  @Expose({ toClassOnly: true })
  @IsString()
  uuid: UUID;

  @Expose({ name: 'isRegistered' })
  @IsBoolean({ message: 'isRegistered must be a boolean' })
  @Transform(({ value }) => value === 1 || value === true)
  is_registered?: boolean;

  @Expose({ name: 'isDeleted' })
  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === true)
  is_deleted?: boolean;

  @Expose({ name: 'updatedAt' })
  @IsDateString()
  @Transform(({ value }) => value, { toClassOnly: true })
  updated_at: Date;

  @Expose({ name: 'updatedBy' })
  @IsString()
  @Transform(({ value }) => value, { toClassOnly: true })
  updated_by: string;

  @Expose({ name: 'createdBy' })
  @IsString()
  @Transform(({ value }) => value, { toClassOnly: true })
  created_by: string;

  @Expose({ name: 'createdAt' })
  @IsDateString()
  @Transform(({ value }) => value, { toClassOnly: true })
  created_at: Date;
}

/**
2024-04-11 23:01:52 info: raw database object: {
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Joshi",
  "is_registered": true,
  "is_deleted": false,
  "is_valid_amount": true,
  "updated_at": "2024-04-12T03:01:51.387Z",
  "updated_by": "Josh",
  "
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
