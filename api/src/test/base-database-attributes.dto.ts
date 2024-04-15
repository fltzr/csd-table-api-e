import { z } from 'zod';
import { UUID } from 'crypto';

export type BaseDatabaseAttributes = {
  uuid?: UUID;
  sl?: string;
  cl?: string;
  is_deleted: boolean;
  updated_by: string;
  updated_at: string;
  created_by: string;
  created_at: string;
});

export const CreateBaseDatabaseAttributes = BaseDatabaseAttributes.pick({
  cl: true,
  sl: true,
  createdBy: true,
});

export const UpdateBaseDatabaseAttributes = BaseDatabaseAttributes.pick({
  cl: true,
  sl: true,
  updatedBy: true,
});
