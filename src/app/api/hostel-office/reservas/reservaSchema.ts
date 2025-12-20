import { z } from "zod";

export const ReservaSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  userId: z.string(),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  nights: z.number().int().positive(),
  guests: z.number().int().positive(),
  totalPrice: z.number().positive(),
  currency: z.string().length(3),
  status: z.enum(["confirmed", "pending", "cancelled"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Reserva = z.infer<typeof ReservaSchema>;