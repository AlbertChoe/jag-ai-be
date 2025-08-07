import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      phone: z.string().min(1).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});
