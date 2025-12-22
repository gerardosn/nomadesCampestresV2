import { z } from 'zod';

const BedSchema = z.object({
  bedId: z.string(),
  label: z.string(),
  status: z.string().optional(), // O/S
});

const PricingSchema = z.object({
  amount: z.number(),
  currency: z.string(),
});

export const HabitacionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['shared', 'private']),
  capacity: z.number(),
  pricing: PricingSchema,
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  beds: z.array(BedSchema),
});

const BedsOutServiceSchema = z.object({
  roomId: z.string(),
  bedId: z.string(),
});

const SummarySchema = z.object({
  total_beds_available: z.number(),
  beds_out_service: z.array(BedsOutServiceSchema),
});

export const HabitacionesArraySchema = z.object({
  summary: SummarySchema,
  rooms: z.array(HabitacionSchema),
});