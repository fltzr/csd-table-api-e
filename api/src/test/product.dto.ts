import { z } from 'zod';
import { BaseDatabaseAttributes } from './base-database-attributes.dto';

export const ProductSchema = BaseDatabaseAttributes.extend({
  productId: z.coerce.number({
    invalid_type_error: 'A valid product ID is required to update resource.',
    required_error: 'Product ID is required to update resource.',
  }),
  p1: z.string(),
  p2: z.string(),
  lp: z.coerce.number(),
  eol: z.coerce.date(),
  mid: z.coerce.number().positive(),
  ccid: z.coerce.number().positive(),
  ptid: z.coerce.number().positive(),
});

export const cps = ProductSchema.required({
  p1: true,
  p2: true,
  lp: true,
  eol: true,
  mid: true,
  ccid: true,
  ptid: true,
  cl: true,
  cl: true,
  createdBy: true,
}).omit({
  productId: true, // id generated at db level
  createdAt: true, // timestamp generated at db level
  updatedAt: true, // not included during creation
  updatedBy: true, // not included during creation
});

export const ups = ProductSchema.required({
  productId: true,
  updatedBy: true,
})
  .omit({
    updatedAt: true,
    createdAt: true,
    createdBy: true,
  })
  .partial()
  .refine(
    (data) =>
      data.p1 !== undefined ||
      data.p2 !== undefined ||
      data.lp !== undefined ||
      data.eol !== undefined ||
      data.mid !== undefined ||
      data.ccid !== undefined ||
      data.ptid !== undefined ||
      data.cl !== undefined ||
      data.sl !== undefined,
    { message: 'No modifiable properties provided.' },
  );

export type CPT = z.infer<typeof cps>;
export type UPT = z.infer<typeof ups>;
