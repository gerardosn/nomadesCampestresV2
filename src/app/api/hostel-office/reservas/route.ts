import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { ReservaSchema } from "./reservaSchema";

// Esquema para validar los parámetros de búsqueda (query params)
const SearchQuerySchema = z.object({
    id: z.string().optional(),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido, debe ser YYYY-MM-DD").optional(),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido, debe ser YYYY-MM-DD").optional(),
}).refine(data => (data.checkIn && data.checkOut) || (!data.checkIn && !data.checkOut), {
    message: "Ambas fechas, checkIn y checkOut, son requeridas para búsqueda por rango de fechas.",
    path: ["checkIn", "checkOut"],
});

export async function GET(request: Request) {
  try {
    // Obtenemos los parámetros de búsqueda de la URL (Query Params)
    const { searchParams } = new URL(request.url);
    const queryParams = {
        id: searchParams.get("id") ?? undefined,
        checkIn: searchParams.get("checkIn") ?? undefined,
        checkOut: searchParams.get("checkOut") ?? undefined,
    };

    // Validamos los query params para mayor seguridad
    const validatedQuery = SearchQuerySchema.safeParse(queryParams);
    if (!validatedQuery.success) {
        return NextResponse.json({ error: "Parámetros de búsqueda inválidos", issues: validatedQuery.error.flatten() }, { status: 400 });
    }
    const { id, checkIn, checkOut } = validatedQuery.data;

    // Construimos la ruta absoluta al archivo JSON de manera segura
    const filePath = path.join(process.cwd(), "src/lib/nosqlJsons/reservas.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);

    // Validamos la integridad de los datos del JSON con safeParse para un mejor manejo de errores
    const validationResult = z.array(ReservaSchema).safeParse(jsonData);
    if (!validationResult.success) {
        console.error('Error de validación Zod en reservas:', validationResult.error.flatten());
        return NextResponse.json({ message: 'Datos de reservas inválidos en el servidor.' }, { status: 500 });
    }
    const allReservas = validationResult.data;

    // Si existe un ID en la query (?id=...), filtramos y devolvemos ese único recurso
    if (id) {
      const reserva = allReservas.find((r) => r.id === id);
      if (!reserva) {
        return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
      }
      return NextResponse.json(reserva);
    }

    // Si se proveen fechas, filtramos por solapamiento
    if (checkIn && checkOut) {
        const searchCheckOutDate = new Date(checkOut);
        const searchCheckInDate = new Date(checkIn);

        const overlappingReservas = allReservas.filter(reserva => {
            // Solo consideramos reservas activas ('confirmed' o 'pending')
            if (reserva.status === 'cancelled') return false;
            
            const reservaCheckInDate = new Date(reserva.checkInDate);
            const reservaCheckOutDate = new Date(reserva.checkOutDate);

            // Condición de solapamiento: (InicioReserva < FinBúsqueda) y (FinReserva > InicioBúsqueda)
            return reservaCheckInDate < searchCheckOutDate && reservaCheckOutDate > searchCheckInDate;
        });
        return NextResponse.json(overlappingReservas);
    }

    // Si no hay id ni fechas, devolvemos todas las reservas
    return NextResponse.json(allReservas);
  } catch (error) {
    console.error("Error al leer o procesar el archivo de reservas:", error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}