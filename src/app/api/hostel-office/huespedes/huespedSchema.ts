import { z } from "zod";

export const DocumentSchema = z.object({
  type: z.string(),
  number: z.string(),
});

export const HuespedSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  nationality: z.string(),
  dateOfBirth: z.string(), // Mantenemos string para formato YYYY-MM-DD
  document: DocumentSchema,
  bookingIds: z.array(z.string()),
  notes: z.string().optional(),
  createdAt: z.string().datetime(), // Valida formato ISO 8601
});

export type Huesped = z.infer<typeof HuespedSchema>;