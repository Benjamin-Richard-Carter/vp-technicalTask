import { z } from 'zod';

export const valueRangeSchema = z.object({
  gte: z.number(),
  lte: z.number().optional(),
});

export const valueRangeArraySchema = z.array(valueRangeSchema);
