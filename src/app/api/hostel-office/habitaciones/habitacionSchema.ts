import { z } from 'zod';

const BedSchema = z.object({
  bedId: z.string().min(1),
  label: z.string().min(1),
});

export const HabitacionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['shared', 'private']),
  capacity: z.number().int().positive(),
  pricing: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
  }),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  beds: z.array(BedSchema),
});

export const HabitacionesArraySchema = z.array(HabitacionSchema);